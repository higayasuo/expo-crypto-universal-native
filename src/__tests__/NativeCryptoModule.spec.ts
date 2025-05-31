import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NativeCryptoModule } from '../NativeCryptoModule';
import * as ExpoCrypto from 'expo-crypto';
import crypto from 'crypto';

// Mock expo-crypto
vi.mock('expo-crypto', () => ({
  getRandomValues: vi.fn((array) => {
    return crypto.getRandomValues(array);
  }),
}));

describe('NativeCryptoModule', () => {
  const nativeCrypto = new NativeCryptoModule();
  const { getRandomValues } = nativeCrypto;

  describe('getRandomValues', () => {
    it('should return the same array with random values', () => {
      const array = new Uint8Array(10);
      const result = getRandomValues(array);
      expect(result).toBe(array);
      expect(ExpoCrypto.getRandomValues).toHaveBeenCalledWith(array);
    });
  });
});
