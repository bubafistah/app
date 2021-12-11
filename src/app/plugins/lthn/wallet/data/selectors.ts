import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WalletsState } from './state';

export const selectWalletsState = createFeatureSelector<WalletsState>('wallets');

export const selectWallets = createSelector(selectWalletsState, (state) => {
	if (state && state.known_wallets) {
		return state.known_wallets;
	}
	return null;
});

export const selectOpenedWallet = createSelector(selectWalletsState, (state) => {
	if (state && state.loaded_wallet) {
		return state.loaded_wallet;
	}
	return null;
});

export const selectWalletCount = createSelector(selectWalletsState, (state) => {
	if (state && state.count) {
		return state.count;
	}
	return null;
});


