import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { crypto, polyfillWebCrypto } from '../polyfillWebCrypto';
import { getRandomValues } from '../getRandomValues';

// Mock expo-crypto
vi.mock('expo-crypto', () => ({
  getRandomValues: vi.fn((array) => {
    // Fill array with predictable values for testing
    for (let i = 0; i < array.length; i++) {
      array[i] = i % 256;
    }
    return array;
  }),
}));

describe('polyfillWebCrypto', () => {
  const originalWindow = global.window;
  let mockWindow: any;

  beforeEach(() => {
    // Create a fresh mock window object for each test
    mockWindow = {};
    global.window = mockWindow;
  });

  afterEach(() => {
    // Restore original window
    global.window = originalWindow;
  });

  it('should export crypto object with getRandomValues', () => {
    expect(crypto).toBeDefined();
    expect(crypto.getRandomValues).toBe(getRandomValues);
  });

  it('should provide getRandomValues functionality', () => {
    const array = new Uint8Array(10);
    const result = getRandomValues(array);
    expect(result).toBe(array);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[9]).toBe(9);
  });

  it('should polyfill window.crypto if not defined', () => {
    // Ensure window.crypto is undefined
    Object.defineProperty(mockWindow, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => undefined,
    });

    // Call polyfill function
    polyfillWebCrypto();

    // Check that window.crypto was defined
    expect(window.crypto).toBeDefined();
    expect(window.crypto.getRandomValues).toBe(getRandomValues);
  });

  it('should not override existing window.crypto', () => {
    // Set up existing crypto object
    const existingCrypto = { someOtherMethod: () => {} };
    Object.defineProperty(mockWindow, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => existingCrypto,
    });

    // Call polyfill function
    polyfillWebCrypto();

    // Check that existing crypto was preserved
    expect(window.crypto).toBe(existingCrypto);
  });

  it('should polyfill crypto.getRandomValues if not defined', () => {
    // Set up crypto without getRandomValues
    const emptyCrypto = {};
    Object.defineProperty(mockWindow, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => emptyCrypto,
    });

    // Call polyfill function
    polyfillWebCrypto();

    // Check that getRandomValues was added
    expect(window.crypto.getRandomValues).toBe(getRandomValues);
  });

  it('should not override existing crypto.getRandomValues', () => {
    // Set up crypto with existing getRandomValues
    const existingGetRandomValues = () => new Uint8Array(1);
    const cryptoWithGetRandomValues = {
      getRandomValues: existingGetRandomValues,
    };
    Object.defineProperty(mockWindow, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => cryptoWithGetRandomValues,
    });

    // Call polyfill function
    polyfillWebCrypto();

    // Check that existing getRandomValues was preserved
    expect(window.crypto.getRandomValues).toBe(existingGetRandomValues);
  });
});
