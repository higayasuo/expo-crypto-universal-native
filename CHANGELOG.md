# Changelog

## [0.2.6] - 2025-04-15

### Added

- Added getRandomValues implementation using expo-crypto
- Added SHA-256, SHA-384, and SHA-512 hashing implementations using expo-crypto

### Changed

- Improved test coverage with comprehensive tests for all modules
- Removed AES-CBC encryption/decryption functionality
- Updated README.md with current API documentation

## [0.2.1] - 2024-03-19

### Changed

- Updated expo-crypto-universal dependency to ^0.2.1

## [0.2.0] - 2024-03-19

### Changed

- Renamed NativeCrypto to NativeCryptoModule for better clarity
- Updated exports to use nativeCryptoModule instead of nativeCrypto

## [0.1.0] - 2024-03-19

### Added

- Initial release
- AES-CBC encryption/decryption with HMAC authentication
- Compatible with Node.js crypto implementation
- Secure against tampering with HMAC verification
- Random IV generation for each encryption
- Support for empty and large data
- TypeScript type definitions
