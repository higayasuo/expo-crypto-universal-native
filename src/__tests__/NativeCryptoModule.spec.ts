import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NativeCryptoModule } from '../NativeCryptoModule';
import * as ExpoCrypto from 'expo-crypto';
import crypto from 'crypto';

// Mock expo-crypto
vi.mock('expo-crypto', () => ({
  getRandomValues: vi.fn((array) => {
    return crypto.getRandomValues(array);
  }),
  digest: vi.fn(async (algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512', data) => {
    // Return predictable hash values based on the algorithm
    const hashLength = {
      'SHA-256': 32,
      'SHA-384': 48,
      'SHA-512': 64,
    }[algorithm];

    const result = new Uint8Array(hashLength);
    for (let i = 0; i < hashLength; i++) {
      result[i] = i % 256;
    }
    return result;
  }),
  CryptoDigestAlgorithm: {
    SHA256: 'SHA-256',
    SHA384: 'SHA-384',
    SHA512: 'SHA-512',
  },
}));

describe('NativeCryptoModule', () => {
  let nativeCrypto: NativeCryptoModule;

  beforeEach(() => {
    nativeCrypto = new NativeCryptoModule();
    // Reset all mocks
    vi.clearAllMocks();
  });

  describe('getRandomValues', () => {
    it('should return the same array with random values', () => {
      const array = new Uint8Array(10);
      const result = nativeCrypto.getRandomValues(array);
      expect(result).toBe(array);
      expect(ExpoCrypto.getRandomValues).toHaveBeenCalledWith(array);
    });
  });

  describe('sha256Async', () => {
    it('should return a 32-byte hash for empty input', async () => {
      const result = await nativeCrypto.sha256Async(new Uint8Array(0));
      expect(result.length).toBe(32);
      expect(ExpoCrypto.digest).toHaveBeenCalledWith(
        ExpoCrypto.CryptoDigestAlgorithm.SHA256,
        new Uint8Array(0),
      );
    });

    it('should return a 32-byte hash for non-empty input', async () => {
      const input = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
      const result = await nativeCrypto.sha256Async(input);
      expect(result.length).toBe(32);
      expect(ExpoCrypto.digest).toHaveBeenCalledWith(
        ExpoCrypto.CryptoDigestAlgorithm.SHA256,
        input,
      );
    });
  });

  describe('sha384Async', () => {
    it('should return a 48-byte hash for empty input', async () => {
      const result = await nativeCrypto.sha384Async(new Uint8Array(0));
      expect(result.length).toBe(48);
      expect(ExpoCrypto.digest).toHaveBeenCalledWith(
        ExpoCrypto.CryptoDigestAlgorithm.SHA384,
        new Uint8Array(0),
      );
    });

    it('should return a 48-byte hash for non-empty input', async () => {
      const input = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
      const result = await nativeCrypto.sha384Async(input);
      expect(result.length).toBe(48);
      expect(ExpoCrypto.digest).toHaveBeenCalledWith(
        ExpoCrypto.CryptoDigestAlgorithm.SHA384,
        input,
      );
    });
  });

  describe('sha512Async', () => {
    it('should return a 64-byte hash for empty input', async () => {
      const result = await nativeCrypto.sha512Async(new Uint8Array(0));
      expect(result.length).toBe(64);
      expect(ExpoCrypto.digest).toHaveBeenCalledWith(
        ExpoCrypto.CryptoDigestAlgorithm.SHA512,
        new Uint8Array(0),
      );
    });

    it('should return a 64-byte hash for non-empty input', async () => {
      const input = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
      const result = await nativeCrypto.sha512Async(input);
      expect(result.length).toBe(64);
      expect(ExpoCrypto.digest).toHaveBeenCalledWith(
        ExpoCrypto.CryptoDigestAlgorithm.SHA512,
        input,
      );
    });
  });
});
