# Installation Guide

## Option 1: Install from VSIX (Recommended)

1. **Package the extension:**
   ```bash
   cd /Volumes/WORK/Job/Projects/testProject/antigravity-brain-cleaner
   npm install -g @vscode/vsce
   vsce package
   ```

2. **Install in VSCode/Antigravity IDE:**
   - Open VSCode/Antigravity IDE
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Extensions: Install from VSIX..."
   - Select the generated `.vsix` file
   - Reload the window when prompted

## Option 2: Development Mode

1. **Open the extension folder:**
   ```bash
   cd /Volumes/WORK/Job/Projects/testProject/antigravity-brain-cleaner
   code .
   ```

2. **Press F5** to open a new VSCode window with the extension loaded

## Usage

After installation, you'll see a broom icon in the left sidebar (Activity Bar). Click it to:
- View the current cache size
- Clean the Antigravity brain cache with confirmation

## What Gets Cleaned?

The extension cleans the folder: `~/.gemini/antigravity/brain`

This is where Antigravity stores its brain cache data.
