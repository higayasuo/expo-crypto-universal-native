# expo-crypto-universal-native

Native implementation of expo-crypto-universal for Expo applications.

## Installation

```bash
npm install expo-crypto-universal-native
```

## Usage

```typescript
import { nativeCrypto } from 'expo-crypto-universal-native';

// Example usage
const key = new Uint8Array(32); // 32-byte key
const data = new Uint8Array([1, 2, 3, 4, 5]);

// Encrypt data
const encrypted = await nativeCrypto.aesEncryptAsync(data, key);

// Decrypt data
const decrypted = await nativeCrypto.aesDecryptAsync(encrypted, key);
```

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
