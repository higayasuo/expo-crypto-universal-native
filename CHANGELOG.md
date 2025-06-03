# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.12] - 2025-06-03

### Added

- Added `nativeCryptoModule` variable to `NativeCryptoModule.ts` for convenient access to the module's functionality.

## [0.2.11] - 2025-05-31

### Removed

- Removed SHA-256, SHA-384, SHA-512, and SHA-2 hashing functions

## [0.2.9] - 2025-05-31

### Changed

- Updated expo-crypto-universal dependency to ^0.2.9

## [0.2.8] - 2025-05-31

### Changed

- Updated expo-crypto-universal dependency to ^0.2.8

## [0.2.7] - 2025-04-16

### Changed

- Moved expo-crypto-universal from dependencies to peerDependencies and updated its version
- Removed unused dependency on base64-js

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

[Unreleased]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.2.12...HEAD
[0.2.12]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.2.11...v0.2.12
[0.2.11]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.2.9...v0.2.11
[0.2.9]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.2.8...v0.2.9
[0.2.8]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.2.7...v0.2.8
[0.2.7]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.2.1...v0.2.6
[0.2.1]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/higayasuo/expo-crypto-universal-native/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/higayasuo/expo-crypto-universal-native/releases/tag/v0.1.0
