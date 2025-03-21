# Changelog

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
