# 🚀 Quick Start Guide - Antigravity Cleaner

## Installation (2 minutes)

### Step 1: Install the Extension
```bash
# Open VSCode/Antigravity IDE
# Press: Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux)
# Type: "Extensions: Install from VSIX..."
# Select: antigravity-brain-cleaner-0.0.4.vsix
```

### Step 2: Reload Window
After installation, reload the VSCode window (you'll be prompted).

## Usage (10 seconds)

### 1️⃣ Find the Broom Icon
Look at the **left sidebar** (Activity Bar) - you'll see a **broom icon** 🧹

### 2️⃣ Click the Broom
The sidebar will show:
- **"Clean Brain Cache"** button
- **"Cache size: X MB"** (current cache size)

### 3️⃣ Clean the Cache
1. Click **"Clean Brain Cache"**
2. Confirm in the dialog: **"Yes, Clean"**
3. Done! ✅

## What Gets Cleaned?

The extension cleans this folder:
```
~/.gemini/antigravity/brain
```

This is where Antigravity stores temporary brain cache data.

## Screenshots

### Extension in Sidebar
[See the broom icon in the activity bar and the clean button in the sidebar panel]

### Confirmation Dialog
[Modal dialog asking for confirmation before cleaning]

## Safety Features

✅ **Confirmation Dialog** - Prevents accidental deletions
✅ **Clear Messages** - Shows success/error notifications
✅ **Cache Size Display** - See how much space you're freeing
✅ **Folder Recreation** - Automatically recreates the empty folder structure

## Troubleshooting

**Q: I don't see the broom icon**
A: Make sure you reloaded the window after installation

**Q: "Cache not found" message**
A: This is normal if Antigravity hasn't created the folder yet

**Q: Permission error**
A: Make sure you have read/write access to `~/.gemini/antigravity/brain`

## Need Help?

Check the full documentation:
- `README.md` - Full documentation
- `INSTALL.md` - Detailed installation guide
- `SUMMARY.md` - Complete feature list

---

**Enjoy your clean Antigravity brain! 🧹✨**
