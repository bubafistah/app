import { createAction, props } from '@ngrx/store';

export const addWallet = createAction(
	'[Wallet] Adding Known Wallet',
	props<{ wallet: string }>()
);

export const switchWallet = createAction(
	'[Wallet] Switching Wallets',
	props<{ wallet: string }>()
);

export const getWalletList = createAction(
	'[Wallet] Get Wallet list'
)


export const openWallet = createAction(
	'[Wallet] Open Wallet',
	props<{ wallet: string, password: string }>()
)


