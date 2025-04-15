# expo-crypto-universal-native

Native implementation of expo-crypto-universal, providing cryptographic operations using Expo's crypto module.

## Features

- Random values generation
- SHA-256, SHA-384, and SHA-512 hashing
- SHA-2 hashing with configurable bit length

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

// Hash data with SHA-256
const data = new Uint8Array([1, 2, 3, 4]);
const hash256 = await nativeCryptoModule.sha256Async(data);

// Hash data with SHA-384
const hash384 = await nativeCryptoModule.sha384Async(data);

// Hash data with SHA-512
const hash512 = await nativeCryptoModule.sha512Async(data);

// Hash data with SHA-2 (configurable bit length)
const hash = await nativeCryptoModule.sha2Async(256, data); // 256, 384, or 512 bits
```

## API

### `nativeCryptoModule.getRandomBytes(size: number): Uint8Array`

Generates cryptographically secure random bytes of the specified size.

### `nativeCryptoModule.getRandomValues(array: Uint8Array): Uint8Array`

Fills the provided Uint8Array with cryptographically secure random values.

### `nativeCryptoModule.sha256Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-256 hash of the input data.

### `nativeCryptoModule.sha384Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-384 hash of the input data.

### `nativeCryptoModule.sha512Async(data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-512 hash of the input data.

### `nativeCryptoModule.sha2Async(bits: number, data: Uint8Array): Promise<Uint8Array>`

Computes the SHA-2 hash of the input data with the specified bit length (256, 384, or 512).

## Security

This implementation uses Expo's crypto module for all cryptographic operations, ensuring high security standards.

## License

MIT
