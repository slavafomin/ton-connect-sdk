import { createMemo, createSignal } from 'solid-js';
import { WalletInfoWithOpenMethod, WalletOpenMethod } from 'src/models/connected-wallet';
import { LastSelectedWalletInfoStorage } from 'src/storage';
import { ReturnStrategy } from 'src/models';
import { WalletsModalState } from 'src/models/wallets-modal';

export type ActionName = 'confirm-transaction' | 'transaction-sent' | 'transaction-canceled';

export type Action = BasicAction | ConfirmTransactionAction;

type BasicAction = {
    name: ActionName;
    openModal: boolean;
    showNotification: boolean;
};

export type ConfirmTransactionAction = BasicAction & {
    name: 'confirm-transaction';
    returnStrategy: ReturnStrategy;
    twaReturnUrl: `${string}://${string}`;
};

export const [walletsModalState, setWalletsModalState] = createSignal<WalletsModalState>({
    status: 'closed',
    closeReason: null
});

export const getWalletsModalIsOpened = createMemo(() => walletsModalState().status === 'opened');

let lastSelectedWalletInfoStorage =
    typeof window !== 'undefined' ? new LastSelectedWalletInfoStorage() : undefined;
export const [lastSelectedWalletInfo, _setLastSelectedWalletInfo] = createSignal<
    | WalletInfoWithOpenMethod
    | {
          openMethod: WalletOpenMethod;
      }
    | null
>(lastSelectedWalletInfoStorage?.getLastSelectedWalletInfo() || null);

export const setLastSelectedWalletInfo = (
    walletInfo:
        | WalletInfoWithOpenMethod
        | {
              openMethod: WalletOpenMethod;
          }
        | null
): void => {
    if (!lastSelectedWalletInfoStorage) {
        lastSelectedWalletInfoStorage = new LastSelectedWalletInfoStorage();
    }

    if (walletInfo) {
        lastSelectedWalletInfoStorage.setLastSelectedWalletInfo(walletInfo);
    } else {
        lastSelectedWalletInfoStorage.removeLastSelectedWalletInfo();
    }
    _setLastSelectedWalletInfo(walletInfo);
};

export const [action, setAction] = createSignal<Action | null>(null);
