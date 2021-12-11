import { Action, createReducer, on } from '@ngrx/store';
import {Wallet, WalletsState, WalletState} from './state';

import * as WalletActions from './actions';
import {WalletLoaded, WalletTransfers} from './actions';

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
			...state.wallets, [address]: new Wallet(address)
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
			...state.wallets, [address]: new Wallet(address)
		}
	})),
	on(WalletActions.WalletTransfers, (state: any, { address, transfers }) => ({
		...state, wallets: {
			...state.wallets,[address]: {
				...state.wallets[address], transfers: transfers
			}
		}
	})),
	on(WalletActions.WalletBalance, (state: any, { address, balance }) => ({
		...state, wallets: {
			...state.wallets, [address]: {
				...state.wallets[address], balance:  balance
			}
		}
	}))
);

export function reducer(state, action) {
	return walletReducer(state, action);
}
