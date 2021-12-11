import { Action, createReducer, on } from '@ngrx/store';
import { WalletsState } from './state';

import * as WalletActions from './actions';

export const initialState: WalletsState = {
	known_wallets: [],
	loaded_wallet: ''
};

const walletReducer = createReducer(
	initialState,
	on(WalletActions.addWallet, (state: any, { wallet }) => ({
		...state,
		known_wallets: [
			...state.known_wallets,
			wallet
		]
	})),
	on(WalletActions.openWallet, (state: any, {wallet, password}) => ({
		...state,
		loaded_wallet: wallet,
		known_wallets: [
			...state.known_wallets,
			wallet
		]
	}))
);

export function reducer(state, action) {
	return walletReducer(state, action);
}
