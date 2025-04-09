import { polyfillWebCrypto } from './polyfillWebCrypto';

export * from './NativeCryptoModule';
export * from './getRandomValues';
export * from './polyfillWebCrypto';

polyfillWebCrypto();
