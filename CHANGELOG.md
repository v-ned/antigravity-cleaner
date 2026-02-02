# Change Log

All notable changes to the "Antigravity Cleaner" extension will be documented in this file.

## [1.1.5] - 2026-02-02

### Cross-Platform Security 🛡️
- **Path Verification** - Added full path display to the "Clean All" confirmation dialog so Windows/Mac users can verify exactly which folder is being targeted before deletion
- **Windows Compatibility** - Verified full support for Windows file paths and Explorer integration

## [1.1.4] - 2026-02-02

### Usability Improvements 🖱️
- **Always Visible Actions** - The delete (trash) icon next to folders is now always visible (dimmed) and fully opaque on hover, making it easier to spot without guessing

## [1.1.3] - 2026-02-02

### Bug Fixes 🐛
- **Fix Disappearing Icons** - Resolved a CSS issue where folder icons would become invisible when hovering over the row (due to inheriting the background color)

## [1.1.2] - 2026-02-02

### Native Icons 🛠️
- **Integrated Icon Assets** - Switched to using locally bundled SVG assets for icons instead of inline paths
- **Solid Style** - Adopted the standard "Filled" icon style for Folder and Trash to match VS Code default look
- **Reliable Rendering** - Icons now use webview resource URIs to ensure correct loading and crisper display

## [1.1.1] - 2026-02-02

### Icon Perfection 🎨
- **Pixel-Perfect Icons** - Updated SVG paths to be 100% identical to VS Code's native icons (including the trash can with vertical stripes)
- **Sharp Rendering** - Adjusted viewport and sizing for crisp display on all screens
- **Exact Match** - Folder and Trash icons now match the user's specific request for the "outline with detail" style

## [1.1.0] - 2026-02-02

### UI Aesthetics ✨
- **Native SVGs** - Replaced emojis with vector-perfect SVG icons for folders and trash
- **VS Code Look & Feel** - Icons are exact matches of VS Code's native Codicons (folder, trash)
- **Theme integration** - Icons automatically adapt to the theme (Clean Button icon is white, Folder icons follow theme foreground)
- **Refined Layout** - List items aligned perfectly to match standard file explorer lists

## [1.0.9] - 2026-02-02

### Major UI Overhaul 🎨
- **Unified Interface** - Replaced standard tree view with a custom Webview panel
- **Single Panel** - No more split view; Clean Cache button and Folder List are now in one seamless window
- **Improved Styling** - Custom HTML/CSS interface that mimics VS Code's native look perfectly
- **Stable UX** - Large blue "Clean Cache" button is ALWAYs visible at the top, regardless of cache state

### Fixed
- **VSCode Limitation Solved** - Bypassed the limitation where buttons disappear when list is not empty by moving to Webview architecture
- **Smoother Interactions** - Faster UI updates without "flashing" or layout shifts

## [1.0.8] - 2026-02-02

### Added
- **Two-Panel Layout** - Split the sidebar into "Actions" and "Brain Cache Folders"
- **Persistent Clean Button** - The big blue "Clean Cache" button is now always visible in the Actions panel
- **Proper Inline Deletion** - Inline trash icon works correctly for individual folders

### Fixed
- **Clean Cache Button Visibility** - Resolved issue where button would disappear when cache was not empty
- **Layout Logic** - Separated actions from content for better UX

### Changed
- The "Actions" panel uses the `viewsWelcome` mechanism to render the primary action button style
- Renamed main view to "Brain Cache Folders"

## [1.0.7] - 2026-02-02

### Added
- **Welcome View Button** - Large blue "Clean Cache" button like Debug panel
- **viewsWelcome** - Clean Cache button now appears at the top of the panel

### Changed
- **Improved UI** - Clean Cache button now styled like VSCode's Run and Debug button
- **Trash icon** - Clean Cache button uses trash icon ($(trash)) instead of broom
- **Removed inline button** - Clean Cache no longer appears as tree item

### Improved
- Better visual consistency with VSCode's native panels
- More prominent Clean Cache action
- Cleaner panel layout

## [1.0.6] - 2026-02-02

### Fixed
- **CRITICAL: Fixed folder opening** - Resolved "Cannot read properties of undefined" error
- **Fixed command arguments** - Folder path now properly passed to openFolder command
- **Changed Clean Cache icon** - Now uses broom icon instead of file icon

### Changed
- Clean Cache button now displays with broom.svg icon
- Folder click command now receives folderPath as argument
- Improved error handling for folder operations

## [1.0.5] - 2026-02-02

### Fixed
- **Removed duplicate Cancel button** - Dialogs now show only one Cancel button (implicit)
- **Fixed Finder opening on macOS** - Clicking folder now properly opens in Finder/Explorer
- **Improved Clean Cache button** - Now displays with emoji icon for better visibility

### Changed
- Clean Cache button now shows "🗑️  Clean Cache" with emoji
- Folder items now have click command to open in file manager
- Simplified dialog buttons (only action button shown)

## [1.0.4] - 2026-02-02

### Added
- **Individual folder delete** - Trash icon next to each folder for quick deletion
- **Inline delete button** - Delete individual folders without cleaning entire cache
- **Context menu** - Right-click folders for more options

### Changed
- **Moved cache size info** - Now displayed in "Cache Folders:" header
- **Header format** - Shows "Cache Folders: [size] (X folders)"
- **Clean Cache button** - Now explicitly cleans ALL folders
- **Command titles** - Clearer naming ("Clean All Cache Folders")

### Improved
- Better UX - delete individual folders or all at once
- More granular control over cache management
- Clearer visual hierarchy in sidebar

## [1.0.3] - 2026-02-02

### Added
- **Sidebar panel** with detailed cache information
- **Folder list** showing all folders in brain cache
- **Folder sizes** displayed next to each folder name
- **Click to open** - Click any folder to open it in Finder (macOS) or Explorer (Windows)
- **Refresh button** in panel title bar
- **Clean button** in panel title bar
- **Empty state** message when cache is clean
- **Tooltips** showing full path and size on hover

### Changed
- Restored sidebar panel (removed auto-popup)
- Panel now shows "Brain Cache" as title
- More informative UI with folder breakdown

### Improved
- Better user experience with visual folder list
- Cross-platform support (macOS and Windows)
- Users can see exactly what will be cleaned before confirming

## [1.0.2] - 2026-02-02

### Added
- Author information (VNED.PRO)
- Homepage and repository links
- MIT License
- Proper activation events for better extension loading
- Keywords for marketplace discoverability

### Fixed
- Extension installation issues
- Proper metadata for VSCode marketplace

## [1.0.1] - 2026-02-02

### Changed
- Clicking the broom icon now immediately shows a popup with cache size
- Removed sidebar panel for cleaner UX
- Popup shows cache size before confirmation

### Improved
- User experience - one click to see cache size and clean

## [1.0.0] - 2026-02-02

### Added
- Initial release
- Broom icon in activity bar
- Clean Antigravity brain cache functionality
- Confirmation dialog
- Cache size display
- Custom icon (AGCleaner.png)
