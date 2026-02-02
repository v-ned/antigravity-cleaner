# Publishing to VSCode Marketplace

## Prerequisites

1. Create a publisher account at https://marketplace.visualstudio.com/
2. Create a Personal Access Token (PAT) at https://dev.azure.com/

## Steps to Publish

### 1. Login to vsce

```bash
npx vsce login VNED-PRO
```

Enter your Personal Access Token when prompted.

### 2. Publish the Extension

```bash
npx vsce publish
```

Or publish a specific version:

```bash
npx vsce publish 1.0.2
```

### 3. Update Version

To publish a new version:

```bash
# Patch version (1.0.2 -> 1.0.3)
npx vsce publish patch

# Minor version (1.0.2 -> 1.1.0)
npx vsce publish minor

# Major version (1.0.2 -> 2.0.0)
npx vsce publish major
```

## Manual Installation (Without Marketplace)

Users can install the extension manually:

1. Download `antigravity-cleaner-1.1.5.vsix`
2. Open VSCode
3. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
4. Type: `Extensions: Install from VSIX...`
5. Select the `.vsix` file

## Extension Information

- **Name**: Antigravity Cleaner
- **Publisher**: VNED-PRO
- **Author**: VNED.PRO
- **Website**: https://vned.pro
- **Version**: 1.1.5
- **License**: MIT

## Marketplace Listing

The extension will appear in the VSCode Marketplace with:
- Custom icon (resources/icon.png)
- Description: "Clean Antigravity brain cache with a single click"
- Author: VNED.PRO
- Homepage: https://vned.pro
- Repository: https://github.com/v-ned/antigravity-cleaner/
- Keywords: antigravity, cleaner, cache, brain, cleanup, vned

## Support

For issues or questions, visit: https://vned.pro
