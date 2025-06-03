# expo-crypto-universal-native

Native implementation of expo-crypto-universal, providing cryptographic operations using Expo's crypto module.

## Features

- Random values generation

## Installation

```bash
npm install expo-crypto-universal-native
```

## Usage

```typescript
import { nativeCryptoModule } from 'expo-crypto-universal-native';

// Generate random bytes
const randomBytes = nativeCryptoModule.getRandomBytes(32);

// Fill array with random values
const filledArray = nativeCryptoModule.getRandomValues(new Uint8Array(32));
```

## API

### `nativeCryptoModule.getRandomBytes(size: number): Uint8Array`

Generates a new Uint8Array of the specified size, filled with cryptographically secure random values.

### `nativeCryptoModule.getRandomValues(array: Uint8Array): Uint8Array`

Fills the provided Uint8Array with cryptographically secure random values.

## Security

This implementation uses Expo's crypto module for all cryptographic operations, ensuring high security standards.

## License

MIT
