import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NativeCryptoModule } from '../NativeCryptoModule';
import * as ExpoCrypto from 'expo-crypto';
import crypto from 'crypto';

// Mock expo-crypto's getRandomBytes
vi.mock('expo-crypto', () => ({
  getRandomBytes: vi.fn(),
  digestStringAsync: vi.fn(),
  CryptoDigestAlgorithm: {
    SHA256: 'SHA-256',
  },
  CryptoEncoding: {
    BASE64: 'base64',
  },
}));

// Helper function to encrypt using Node.js crypto module with AES-CBC and HMAC
async function nodeAesEncrypt(
  data: Uint8Array,
  key: Uint8Array,
): Promise<Uint8Array> {
  const iv = crypto.randomBytes(16);
  const hmacKey = crypto.randomBytes(32);

  // Encrypt data
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  // Combine IV, HMAC key, and encrypted data
  const encryptedData = Buffer.concat([iv, hmacKey, encrypted]);

  // Generate HMAC (full 32 bytes)
  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(encryptedData);
  const fullHmac = hmac.digest();

  return Buffer.concat([encryptedData, fullHmac]);
}

// Helper function to decrypt using Node.js crypto module with AES-CBC and HMAC
async function nodeAesDecrypt(
  data: Uint8Array,
  key: Uint8Array,
): Promise<Uint8Array> {
  const iv = data.slice(0, 16);
  const hmacKey = data.slice(16, 48);
  const encrypted = data.slice(48, -32);
  const receivedHmac = data.slice(-32);

  // Verify HMAC
  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(data.slice(0, -32));
  const calculatedHmac = hmac.digest();

  if (!calculatedHmac.equals(receivedHmac)) {
    throw new Error('Invalid HMAC');
  }

  // Decrypt data
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}

describe('NativeCryptoModule', () => {
  let nativeCrypto: NativeCryptoModule;

  beforeEach(() => {
    nativeCrypto = new NativeCryptoModule();
    // Reset all mocks
    vi.clearAllMocks();
    // Use Node.js crypto.randomBytes for predictable testing
    vi.mocked(ExpoCrypto.getRandomBytes).mockImplementation((size: number) => {
      return crypto.randomBytes(size);
    });
  });

  describe('AES-CBC encryption/decryption with HMAC', () => {
    it('should produce compatible results with Node.js crypto implementation', async () => {
      const key = new Uint8Array(32).fill(2); // 32-byte key filled with 2s
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      // Test cross-implementation encryption/decryption
      const encryptedNative = await nativeCrypto.aesEncryptAsync(testData, key);
      const decryptedNode = await nodeAesDecrypt(encryptedNative, key);
      expect(Array.from(decryptedNode)).toEqual(Array.from(testData));

      const encryptedNode = await nodeAesEncrypt(testData, key);
      const decryptedNative = await nativeCrypto.aesDecryptAsync(
        encryptedNode,
        key,
      );
      expect(Array.from(decryptedNative)).toEqual(Array.from(testData));

      // Verify both implementations can decrypt their own output
      const decryptedNative2 = await nativeCrypto.aesDecryptAsync(
        encryptedNative,
        key,
      );
      expect(Array.from(decryptedNative2)).toEqual(Array.from(testData));

      const decryptedNode2 = await nodeAesDecrypt(encryptedNode, key);
      expect(Array.from(decryptedNode2)).toEqual(Array.from(testData));
    });

    it('should encrypt and decrypt data correctly', async () => {
      const key = new Uint8Array(32).fill(2); // 32-byte key filled with 2s
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      // Encrypt the data
      const encrypted = await nativeCrypto.aesEncryptAsync(testData, key);
      expect(encrypted.length).toBeGreaterThan(testData.length);
      expect(ExpoCrypto.getRandomBytes).toHaveBeenCalledTimes(2); // IV and HMAC key

      // Decrypt the data
      const decrypted = await nativeCrypto.aesDecryptAsync(encrypted, key);
      expect(Array.from(decrypted)).toEqual(Array.from(testData));
    });

    it('should generate different ciphertexts for same data', async () => {
      const key = new Uint8Array(32).fill(2);
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      const encrypted1 = await nativeCrypto.aesEncryptAsync(testData, key);
      const encrypted2 = await nativeCrypto.aesEncryptAsync(testData, key);

      // Should be different due to random IV and HMAC key
      expect(Buffer.from(encrypted1)).not.toEqual(Buffer.from(encrypted2));

      // But both should decrypt to the same data
      const decrypted1 = await nativeCrypto.aesDecryptAsync(encrypted1, key);
      const decrypted2 = await nativeCrypto.aesDecryptAsync(encrypted2, key);

      expect(Array.from(decrypted1)).toEqual(Array.from(testData));
      expect(Array.from(decrypted2)).toEqual(Array.from(testData));
    });

    it('should fail to decrypt with wrong key', async () => {
      const key1 = new Uint8Array(32).fill(2);
      const key2 = new Uint8Array(32).fill(3);
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      const encrypted = await nativeCrypto.aesEncryptAsync(testData, key1);
      await expect(
        nativeCrypto.aesDecryptAsync(encrypted, key2),
      ).rejects.toThrow('Decryption failed');
    });

    it('should fail to decrypt with tampered HMAC', async () => {
      const key = new Uint8Array(32).fill(2);
      const testData = new Uint8Array([1, 2, 3, 4, 5]);

      const encrypted = await nativeCrypto.aesEncryptAsync(testData, key);
      // Tamper with HMAC
      encrypted[encrypted.length - 32] ^= 1;

      await expect(
        nativeCrypto.aesDecryptAsync(encrypted, key),
      ).rejects.toThrow('Invalid HMAC');
    });

    it('should handle empty data', async () => {
      const key = new Uint8Array(32).fill(2);
      const testData = new Uint8Array(0);

      const encrypted = await nativeCrypto.aesEncryptAsync(testData, key);
      const decrypted = await nativeCrypto.aesDecryptAsync(encrypted, key);
      expect(Array.from(decrypted)).toEqual(Array.from(testData));
    });

    it('should handle large data', async () => {
      const key = new Uint8Array(32).fill(2);
      const testData = new Uint8Array(1024).fill(5); // 1KB of data

      const encrypted = await nativeCrypto.aesEncryptAsync(testData, key);
      const decrypted = await nativeCrypto.aesDecryptAsync(encrypted, key);

      expect(Array.from(decrypted)).toEqual(Array.from(testData));
    });
  });
});
