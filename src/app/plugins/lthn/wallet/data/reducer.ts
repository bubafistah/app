import { Action, createReducer, on } from '@ngrx/store';
import { WalletsState } from './state';

import * as WalletActions from './actions';

export const initialState: WalletsState = {
	count: 0,
	known_wallets: [],
	loaded_wallet: ''
};

const walletReducer = createReducer(
	initialState,
	on(WalletActions.addWallet, (state: any, { wallet }) => ({
		...state,
		count: state.count+1,
		known_wallets: [
			...state.known_wallets,
			wallet
		]
	})),
	on(WalletActions.openWallet, (state: any, {wallet, password}) => ({
		...state,
		loaded_wallet: wallet,
		count: state.count+1,
		known_wallets: [
			...state.known_wallets,
			wallet
		]
	}))
);

export function reducer(state, action) {
	return walletReducer(state, action);
}
