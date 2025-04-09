import { describe, it, expect, vi } from 'vitest';
import { getRandomValues } from '../getRandomValues';
import { getRandomValues as expoCryptoGetRandomValues } from 'expo-crypto';

// Mock expo-crypto's getRandomValues
vi.mock('expo-crypto', () => ({
  getRandomValues: vi.fn((array) => {
    // Fill array with predictable values for testing
    for (let i = 0; i < array.length; i++) {
      array[i] = i % 256;
    }
    return array;
  }),
}));

describe('getRandomValues', () => {
  it('should throw TypeError when no arguments are provided', () => {
    expect(() => (getRandomValues as any)()).toThrow(TypeError);
    expect(() => (getRandomValues as any)()).toThrow(
      'The provided ArrayBuffer view is not an integer-typed array',
    );
  });

  it('should throw TypeError for non-integer typed arrays', () => {
    const floatArray = new Float32Array(10);
    expect(() => getRandomValues(floatArray as unknown as Int8Array)).toThrow(
      TypeError,
    );
    expect(() => getRandomValues(floatArray as unknown as Int8Array)).toThrow(
      'not an integer-typed array',
    );
  });

  it('should throw QuotaExceededError when byte length exceeds MAX_RANDOM_BYTES', () => {
    const largeArray = new Uint8Array(65537); // MAX_RANDOM_BYTES is 65536
    expect(() => getRandomValues(largeArray)).toThrow(
      "The ArrayBuffer view's byte length (65537) exceeds the number of bytes of entropy available via this API (65536)",
    );
  });

  it('should work with Int8Array', () => {
    const array = new Int8Array(10);
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(expoCryptoGetRandomValues).toHaveBeenCalledWith(array);
  });

  it('should work with Uint8Array', () => {
    const array = new Uint8Array(10);
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(expoCryptoGetRandomValues).toHaveBeenCalledWith(array);
  });

  it('should work with Int16Array', () => {
    const array = new Int16Array(10);
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(expoCryptoGetRandomValues).toHaveBeenCalledWith(array);
  });

  it('should work with Uint16Array', () => {
    const array = new Uint16Array(10);
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(expoCryptoGetRandomValues).toHaveBeenCalledWith(array);
  });

  it('should work with Int32Array', () => {
    const array = new Int32Array(10);
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(expoCryptoGetRandomValues).toHaveBeenCalledWith(array);
  });

  it('should work with Uint32Array', () => {
    const array = new Uint32Array(10);
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(expoCryptoGetRandomValues).toHaveBeenCalledWith(array);
  });

  it('should work with Uint8ClampedArray', () => {
    const array = new Uint8ClampedArray(10);
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(expoCryptoGetRandomValues).toHaveBeenCalledWith(array);
  });

  it('should work with maximum allowed size', () => {
    const array = new Uint8Array(65536); // MAX_RANDOM_BYTES
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(expoCryptoGetRandomValues).toHaveBeenCalledWith(array);
  });
});
