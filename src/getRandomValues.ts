import { getRandomValues as expoCryptoGetRandomValues } from 'expo-crypto';

const MAX_RANDOM_BYTES = 65536;

/**
 * An implementation of Crypto.getRandomValues that uses expo-random's secure random generator if
 * available and falls back to Math.random (cryptographically insecure) when synchronous bridged
 * methods are unavailable.
 *
 * See https://www.w3.org/TR/WebCryptoAPI/#Crypto-method-getRandomValues
 */
export const getRandomValues = <TArray extends ArrayBufferView>(
  values: TArray,
): TArray => {
  if (
    !(values instanceof Int8Array) &&
    !(values instanceof Uint8Array) &&
    !(values instanceof Int16Array) &&
    !(values instanceof Uint16Array) &&
    !(values instanceof Int32Array) &&
    !(values instanceof Uint32Array) &&
    !(values instanceof Uint8ClampedArray)
  ) {
    throw new TypeError(
      `The provided ArrayBuffer view is not an integer-typed array`,
    );
  }

  if (values.byteLength > MAX_RANDOM_BYTES) {
    throw new QuotaExceededError(
      `The ArrayBuffer view's byte length (${values.byteLength}) exceeds the number of bytes of entropy available via this API (${MAX_RANDOM_BYTES})`,
    );
  }

  return expoCryptoGetRandomValues(values);
};

class QuotaExceededError extends Error {
  name = 'QuotaExceededError';
  code = 22; // QUOTA_EXCEEDED_ERR
}
