import { Wallet, WalletInfoInjectable, WalletInfoRemote } from '@tonconnect/sdk';

export type WalletOpenMethod = 'qrcode' | 'universal-link';

export type WalletInfoWithOpenMethod =
    | WalletInfoInjectable
    | WalletInfoRemoteWithOpenMethod
    | (WalletInfoInjectable & WalletInfoRemoteWithOpenMethod);

export type WalletInfoRemoteWithOpenMethod = WalletInfoRemote & {
    openMethod?: WalletOpenMethod;
};

export type ConnectedWallet = Wallet & WalletInfoWithOpenMethod;
