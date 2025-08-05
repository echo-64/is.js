# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-08-05

### Added
- Add `empty()` instance method - checks if `is.actual` is an empty string, array, or object

### Chore
- Bumped `typescript` from `^5.8.3` to `^5.9.2`

## [1.1.0] - 2025-07-30

### Added
- `is(x).in(string)` now supports checking substrings in strings
- `is(x).array({ empty: false })` add empty option to control empty-array matching
- `is(x).object({ empty: false })` add empty option to control empty-object matching

### Chore
- Bumped `rollup` from `^4.44.0` to `^4.46.2`

## [1.0.1] - 2025-06-24

### Chore
- Bumped `rollup` from `^4.41.1` to `^4.44.0`

### Fixed
- Corrected JSDoc `@param` type from `Specific` to `Expected` in `type.mjs`

## [1.0.0] - 2025-06-20

### Added
- Initial release of `@echo-64/is.js`
