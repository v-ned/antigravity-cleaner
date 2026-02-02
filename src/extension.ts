import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Antigravity Cleaner is now active');

    // Create and register the Webview View Provider
    const provider = new BrainCleanerViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('antigravity-cleaner-view', provider)
    );

    // Register commands that interact with the provider
    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-cleaner.refresh', () => {
            provider.refresh();
        }),
        vscode.commands.registerCommand('antigravity-cleaner.clean', () => {
            provider.cleanAll();
        })
    );
}

class BrainCleanerViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'cleanAll': {
                    await this.cleanAll();
                    break;
                }
                case 'openFolder': {
                    this.openInFileManager(data.path);
                    break;
                }
                case 'deleteFolder': {
                    await this.deleteFolder(data.name, data.path);
                    break;
                }
                case 'refresh': {
                    this.refresh();
                    break;
                }
            }
        });

        // Initialize view with data
        this.updateView();
    }

    public refresh() {
        if (this._view) {
            this.updateView();
        }
    }

    private updateView() {
        if (!this._view) {
            return;
        }

        const brainPath = path.join(os.homedir(), '.gemini', 'antigravity', 'brain');
        const folders = this.getFoldersData(brainPath);
        const totalSize = folders.reduce((acc, curr) => acc + curr.sizeBytes, 0);

        this._view.webview.postMessage({
            type: 'update',
            folders: folders,
            totalSize: this.formatBytes(totalSize),
            count: folders.length
        });
    }

    public async cleanAll() {
        const brainPath = path.join(os.homedir(), '.gemini', 'antigravity', 'brain');

        if (!fs.existsSync(brainPath)) {
            vscode.window.showWarningMessage('Antigravity brain folder not found.');
            return;
        }

        const folders = this.getFoldersData(brainPath);
        const folderCount = folders.length;
        const totalSize = folders.reduce((acc, curr) => acc + curr.sizeBytes, 0);
        const sizeStr = this.formatBytes(totalSize);

        if (folderCount === 0) {
            vscode.window.showInformationMessage('Cache is already empty!');
            return;
        }

        const message = `Clean All Cache Folders?\n\nSize: ${sizeStr}\nFolders: ${folderCount}\nPath: ${brainPath}`;

        const answer = await vscode.window.showWarningMessage(
            message,
            { modal: true },
            'Yes, Clean All'
        );

        if (answer === 'Yes, Clean All') {
            try {
                await this.deleteFolderRecursive(brainPath);
                fs.mkdirSync(brainPath, { recursive: true });

                vscode.window.showInformationMessage(`Successfully cleaned ${sizeStr} (${folderCount} folders)!`);
                this.refresh();
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to clean brain cache: ${error}`);
            }
        }
    }

    private async deleteFolder(name: string, folderPath: string) {
        const answer = await vscode.window.showWarningMessage(
            `Delete folder "${name}"?`,
            { modal: true },
            'Yes, Delete'
        );

        if (answer === 'Yes, Delete') {
            try {
                await this.deleteFolderRecursive(folderPath);
                this.refresh();
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to delete folder: ${error}`);
            }
        }
    }

    private getFoldersData(brainPath: string): { name: string, path: string, size: string, sizeBytes: number }[] {
        if (!fs.existsSync(brainPath)) {
            return [];
        }

        try {
            return fs.readdirSync(brainPath)
                .filter(item => {
                    try {
                        return fs.statSync(path.join(brainPath, item)).isDirectory();
                    } catch { return false; }
                })
                .map(item => {
                    const itemPath = path.join(brainPath, item);
                    const size = this.getFolderSize(itemPath);
                    return {
                        name: item,
                        path: itemPath,
                        size: this.formatBytes(size),
                        sizeBytes: size
                    };
                })
                .sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            return [];
        }
    }

    private getFolderSize(folderPath: string): number {
        let totalSize = 0;
        if (!fs.existsSync(folderPath)) return 0;
        try {
            const files = fs.readdirSync(folderPath);
            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const stats = fs.statSync(filePath);
                if (stats.isDirectory()) {
                    totalSize += this.getFolderSize(filePath);
                } else {
                    totalSize += stats.size;
                }
            }
        } catch (error) { /* ignore */ }
        return totalSize;
    }

    private async deleteFolderRecursive(folderPath: string): Promise<void> {
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            for (const file of files) {
                const curPath = path.join(folderPath, file);
                if (fs.lstatSync(curPath).isDirectory()) {
                    await this.deleteFolderRecursive(curPath);
                    fs.rmdirSync(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            }
        }
    }

    private formatBytes(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    private openInFileManager(folderPath: string): void {
        const platform = os.platform();
        let command: string;
        if (platform === 'darwin') command = `open "${folderPath}"`;
        else if (platform === 'win32') command = `explorer "${folderPath}"`;
        else command = `xdg-open "${folderPath}"`;

        exec(command, (error) => {
            if (error) vscode.window.showErrorMessage(`Failed to open folder: ${error.message}`);
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const nonce = getNonce();

        // Load URIs for icons
        const trashUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'trash.svg'));
        const folderUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'folder.svg'));

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource};">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Brain Cache</title>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                    color: var(--vscode-foreground);
                    font-family: var(--vscode-font-family);
                    background-color: transparent;
                }
                .container {
                    padding: 20px;
                }
                .actions {
                    margin-bottom: 24px;
                }
                button.clean-btn {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 6px 12px;
                    width: 100%;
                    font-size: 13px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    border-radius: 2px;
                    height: 28px;
                    box-sizing: border-box;
                }
                button.clean-btn:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
                /* Use mask-image to allow color change via background-color */
                .icon {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    -webkit-mask-size: contain;
                    mask-size: contain;
                    -webkit-mask-repeat: no-repeat;
                    mask-repeat: no-repeat;
                    -webkit-mask-position: center;
                    mask-position: center;
                }
                .icon-trash {
                    -webkit-mask-image: url('${trashUri}');
                    mask-image: url('${trashUri}');
                    background-color: currentColor; /* Inherit color */
                }
                .icon-folder {
                    -webkit-mask-image: url('${folderUri}');
                    mask-image: url('${folderUri}');
                    background-color: var(--vscode-icon-foreground);
                }
                
                button.clean-btn .icon-trash {
                    background-color: var(--vscode-button-foreground); /* White on button */
                }

                .info-header {
                    font-size: 11px;
                    font-weight: bold;
                    text-transform: uppercase;
                    color: var(--vscode-sideBarTitle-foreground);
                    margin-bottom: 8px;
                    display: flex;
                    justify-content: space-between;
                }
                .folder-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .folder-item {
                    display: flex;
                    align-items: center;
                    height: 22px; /* Standard tree item height */
                    cursor: pointer;
                    padding-left: 2px;
                    border: 1px solid transparent;
                }
                .folder-item:hover {
                    background-color: var(--vscode-list-hoverBackground);
                    color: var(--vscode-list-hoverForeground);
                }
                /* Removed incorrect hover rule that hid the icon */
                
                .folder-details {
                    flex: 1;
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    overflow: hidden;
                    white-space: nowrap;
                    margin-left: 6px;
                }
                .folder-name {
                    font-size: 13px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .folder-size {
                    font-size: 12px;
                    opacity: 0.8; 
                    margin-left: auto; /* Push size to the right? Or keep near? Let's keep near */
                    margin-right: 8px;
                }
             
                .action-icons {
                    display: flex; /* Always visible */
                    margin-left: auto;
                    padding-right: 4px;
                    opacity: 0; /* Hidden by default to keep UI clean? User asked always visible. Let's try visible but dim. */
                    opacity: 0.6;
                }
                .folder-item:hover .action-icons {
                    opacity: 1;
                }
                .icon-btn {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border-radius: 4px;
                }
                .icon-btn:hover {
                    background-color: var(--vscode-toolbar-hoverBackground);
                }
                .icon-btn .icon-trash {
                     background-color: var(--vscode-icon-foreground);
                }

                .empty-state {
                    text-align: center;
                    margin-top: 40px;
                    color: var(--vscode-descriptionForeground);
                    font-size: 13px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="actions">
                    <button class="clean-btn" id="clean-all-btn">
                        <span class="icon icon-trash"></span>
                        <span>Clean Cache</span>
                    </button>
                </div>

                <div class="info-header">
                    <span>Cache Folders</span>
                    <span id="total-info">...</span>
                </div>

                <ul class="folder-list" id="folder-list">
                </ul>

                <div id="empty-state" class="empty-state" style="display: none;">
                    <span>Cache is empty</span>
                </div>
            </div>

            <script nonce="${nonce}">
                const vscode = acquireVsCodeApi();
                
                const listElement = document.getElementById('folder-list');
                const emptyState = document.getElementById('empty-state');
                const totalInfo = document.getElementById('total-info');
                const cleanBtn = document.getElementById('clean-all-btn');

                cleanBtn.addEventListener('click', () => {
                    vscode.postMessage({ type: 'cleanAll' });
                });

                window.addEventListener('message', event => {
                    const message = event.data;
                    switch (message.type) {
                        case 'update':
                            renderFolders(message.folders, message.totalSize, message.count);
                            break;
                    }
                });

                function renderFolders(folders, totalSize, count) {
                    listElement.innerHTML = '';
                    totalInfo.textContent = \`\${totalSize} (\${count})\`;

                    if (folders.length === 0) {
                        emptyState.style.display = 'block';
                        return;
                    }
                    
                    emptyState.style.display = 'none';

                    folders.forEach(folder => {
                        const li = document.createElement('li');
                        li.className = 'folder-item';
                        
                        // Icon
                        const iconSpan = document.createElement('span');
                        iconSpan.className = 'icon icon-folder';
                        li.appendChild(iconSpan);

                        // Details
                        const contentDiv = document.createElement('div');
                        contentDiv.className = 'folder-details';
                        
                        const nameDiv = document.createElement('span');
                        nameDiv.className = 'folder-name';
                        nameDiv.textContent = folder.name;
                        
                        const sizeDiv = document.createElement('span');
                        sizeDiv.className = 'folder-size';
                        sizeDiv.textContent = folder.size;

                        contentDiv.appendChild(nameDiv);
                        contentDiv.appendChild(sizeDiv);
                        li.appendChild(contentDiv);

                        // Actions
                        const actionsDiv = document.createElement('div');
                        actionsDiv.className = 'action-icons';

                        const trashBtn = document.createElement('div');
                        trashBtn.className = 'icon-btn';
                        trashBtn.title = 'Delete Folder';
                        
                        const trashIcon = document.createElement('span');
                        trashIcon.className = 'icon icon-trash';
                        trashBtn.appendChild(trashIcon);

                        trashBtn.onclick = (e) => {
                            e.stopPropagation();
                            vscode.postMessage({ type: 'deleteFolder', name: folder.name, path: folder.path });
                        };
                        
                        actionsDiv.appendChild(trashBtn);
                        li.appendChild(actionsDiv);

                        // Click to Open
                        li.onclick = () => {
                             vscode.postMessage({ type: 'openFolder', path: folder.path });
                        };

                        listElement.appendChild(li);
                    });
                }
            </script>
        </body>
        </html>`;
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function deactivate() { }
