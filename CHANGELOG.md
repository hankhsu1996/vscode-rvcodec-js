# Change Log

## [0.0.4] - 2025-01-XX

### Added
- Inline assembly decoding feature that shows decoded instructions next to hex values
- New setting `enableInlineDecoding` to control inline decoding (enabled by default)

### Changed
- Hover feature is now disabled by default for better performance

## [0.0.3] - 2025-02-26

### Changed
- Changed license from MIT to AGPL v3 to comply with rvcodecjs dependency
- Added proper attribution and license headers to source files

## [0.0.2] - 2025-02-26

### Changed
- Migrated build system to webpack for better dependency management
- Optimized package size by bundling dependencies

### Fixed
- Fixed dependency resolution issue for rvcodecjs package
- Reduced extension size from ~380KB to ~57KB

## [0.0.1] - 2025-02-25

### Added
- Hover to decode RISC-V instructions from hex values
- Command to encode RISC-V assembly instructions
- Support for multiple hex formats
- Detailed instruction information display
