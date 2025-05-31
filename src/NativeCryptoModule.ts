import * as ExpoCrypto from 'expo-crypto';
import { AbstractCryptoModule } from 'expo-crypto-universal';

/**
 * Native implementation of cryptographic operations using Expo's crypto module.
 * Provides random value generation and SHA-2 hashing functionality.
 *
 * @extends AbstractCryptoModule
 */
export class NativeCryptoModule extends AbstractCryptoModule {
  /**
   * Fills the provided Uint8Array with cryptographically secure random values.
   *
   * @param values - The Uint8Array to fill with random values
   * @returns The same Uint8Array filled with random values
   */
  getRandomValues = (values: Uint8Array): Uint8Array => {
    return ExpoCrypto.getRandomValues(values);
  };
}
