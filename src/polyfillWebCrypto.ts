import { getRandomValues } from './getRandomValues';

/**
 * An object representing the crypto module with the getRandomValues method.
 */
export const crypto = {
  getRandomValues,
};

/**
 * Polyfills the Web Crypto API if it is not available in the current environment.
 * This function checks if the `crypto` object and its `getRandomValues` method are defined.
 * If not, it defines them using the provided implementation.
 */
export const polyfillWebCrypto = (): void => {
  // Use a try-catch block to handle environments where window is not defined
  try {
    // Check if window exists and crypto is not defined
    if (typeof window !== 'undefined' && !window.crypto) {
      Object.defineProperty(window, 'crypto', {
        configurable: true,
        enumerable: true,
        get: () => crypto,
      });
    }

    // Check if window exists and getRandomValues is not defined on crypto
    if (
      typeof window !== 'undefined' &&
      window.crypto &&
      !window.crypto.getRandomValues
    ) {
      Object.defineProperty(window.crypto, 'getRandomValues', {
        configurable: true,
        enumerable: true,
        value: getRandomValues,
      });
    }
  } catch (error) {
    // If window is not defined (e.g., in Node.js environment), do nothing
  }
};
