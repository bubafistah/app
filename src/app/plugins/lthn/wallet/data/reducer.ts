import { Action, createReducer, on } from '@ngrx/store';
import {Wallet, WalletsState, WalletState} from './state';

import * as WalletActions from './actions';
import {WalletLoaded} from './actions';

export const initialState: WalletsState = new WalletState

const walletReducer = createReducer(
	initialState,
	on(WalletActions.addWallet, (state: any, { address }) => ({
		...state,
		known_wallets: [
			...state.known_wallets,
			address
		],
		wallets: {
			...state.wallets, [address]: new Wallet()
		}
	})),
	on(WalletActions.openWallet, (state: any, {address, password}) => ({
		...state,
		loaded_wallet: address,
		known_wallets: [
			...state.known_wallets,
			address
		],
		wallets: {
			...state.wallets, [address]: new Wallet()
		}
	})),
	on(WalletActions.WalletLoaded, (state: any, {stats}) => ({
		...state,
		wallets: {
			...state.wallets,[state.loaded_wallet]: stats
		}
	}))
);

export function reducer(state, action) {
	return walletReducer(state, action);
}
