# Antigravity Cleaner

Clean your Antigravity brain cache with a single click! See exactly what you're cleaning with a detailed folder view.

## Features

- **📊 Detailed Cache View**: See total cache size and number of folders at a glance
- **📁 Folder List**: View all folders in your brain cache with individual sizes
- **🖱️ Click to Open**: Click any folder to open it in Finder (macOS) or Explorer (Windows)
- **🗑️ One-Click Cleaning**: Clean the entire cache with confirmation dialog
- **🔄 Refresh Button**: Update the view to see current cache status
- **💡 Smart UI**: Shows empty state when cache is clean
- **🔍 Tooltips**: Hover over folders to see full path and size

## Usage


### The New Unified Interface

The extension now provides a single, clean panel "Brain Cache" in the sidebar that combines:
1. **Clean Cache Button**: Large, persistent blue button at the top
2. **Folder List**: Direct list of cache folders below

### View Cache Contents

1. Click the broom icon 🧹 in the activity bar (left sidebar)
2. See the "Brain Cache" panel
3. Click any folder to open it in Finder/Explorer

### Clean Cache

**Method 1: Clean All (Recommended)**
- Click the big blue **"Clean Cache"** button at the top
- Confirm the dialog

**Method 2: Delete Individual Folder**
- Hover over any folder in the list
- Click the trash icon 🗑️ next to it
- Confirm deletion

## What Gets Cleaned?

The extension cleans the folder: `~/.gemini/antigravity/brain`

This is where Antigravity stores its brain cache data. Each subfolder represents a different cache session.

## Screenshots

### Sidebar Panel
- Shows cache size (e.g., "Cache: 964.9 KB (3 folders)")
- Lists all folders with individual sizes
- Click folders to open in file manager
- Clean and refresh buttons in title bar

## Installation

### From VSIX

1. Download the `.vsix` file
2. Open VSCode
3. Go to Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
4. Click the "..." menu at the top
5. Select "Install from VSIX..."
6. Choose the downloaded `.vsix` file

### From Source

1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to open a new VSCode window with the extension loaded

## Building

```bash
npm install
npm run compile
```

To package the extension:

```bash
npx @vscode/vsce package
```

## Platform Support

- ✅ **macOS**: Opens folders in Finder
- ✅ **Windows**: Opens folders in Explorer
- ✅ **Linux**: Opens folders in default file manager (xdg-open)

## Requirements

- VSCode 1.75.0 or higher
- Antigravity IDE with brain cache at `~/.gemini/antigravity/brain`

## Commands

- **Clean Antigravity Brain Cache**: Clean the entire cache
- **Refresh Cache View**: Refresh the folder list
- **Open Folder in Finder/Explorer**: Open selected folder (click on folder)

## Author

**VNED.PRO**
- Website: [https://vned.pro](https://vned.pro)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

If you encounter any issues or have suggestions, please visit [https://vned.pro](https://vned.pro)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

Made with ❤️ by [VNED.PRO](https://vned.pro)
