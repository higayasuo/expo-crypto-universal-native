# expo-crypto-universal-native

Native implementation of expo-crypto-universal for Expo applications.

## Installation

```bash
npm install expo-crypto-universal-native
```

## Usage

```typescript
import { nativeCryptoModule } from 'expo-crypto-universal-native';

// Example usage
const key = new Uint8Array(32); // 32-byte key
const data = new Uint8Array([1, 2, 3, 4, 5]);

// Encrypt data
const encrypted = await nativeCryptoModule.aesEncryptAsync(data, key);

// Decrypt data
const decrypted = await nativeCryptoModule.aesDecryptAsync(encrypted, key);
```

## Features

- AES-CBC encryption/decryption with HMAC authentication
- Compatible with Node.js crypto implementation
- Handles empty and large data
- Secure against tampering (HMAC verification)
- Random IV for each encryption

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build
```

## License

MIT
