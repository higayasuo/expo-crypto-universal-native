import * as ExpoCrypto from 'expo-crypto';
import { AbstractCryptoModule } from 'expo-crypto-universal';

export class NativeCryptoModule extends AbstractCryptoModule {
  getRandomValues(values: Uint8Array): Uint8Array {
    return ExpoCrypto.getRandomValues(values);
  }

  async sha256Async(data: Uint8Array): Promise<Uint8Array> {
    const digest = await ExpoCrypto.digest(
      ExpoCrypto.CryptoDigestAlgorithm.SHA256,
      data,
    );

    return new Uint8Array(digest);
  }

  async sha384Async(data: Uint8Array): Promise<Uint8Array> {
    const digest = await ExpoCrypto.digest(
      ExpoCrypto.CryptoDigestAlgorithm.SHA384,
      data,
    );
    return new Uint8Array(digest);
  }

  async sha512Async(data: Uint8Array): Promise<Uint8Array> {
    const digest = await ExpoCrypto.digest(
      ExpoCrypto.CryptoDigestAlgorithm.SHA512,
      data,
    );
    return new Uint8Array(digest);
  }
}
