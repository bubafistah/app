import {createFeatureSelector, createSelector} from '@ngrx/store';
import {WalletsState} from './state';

/**
 * Wallet Datastore feature name
 *
 * @type {MemoizedSelector<object, WalletsState>}
 */
export const selectWalletsState = createFeatureSelector<WalletsState>('wallets');

/**
 * Select known wallets
 *
 * @type {MemoizedSelector<unknown, unknown>}
 */
export const selectWallets = createSelector(selectWalletsState, (state) => {
	if (state && state.known_wallets) {
		return state.known_wallets;
	}
	return null;
});

/**
 * Select Opened Wallet
 *
 * @type {MemoizedSelector<unknown, unknown>}
 */
export const selectOpenedWalletData = createSelector(selectWalletsState, (state) => {

		return state.wallets[state.loaded_wallet];

});export const selectOpenedWallet = createSelector(selectWalletsState, (state) => {

		return state.loaded_wallet;

});

/**
 * Select Wallet Global
 * @returns {MemoizedSelector<unknown, unknown>}
 */
export const selectWalletData = createSelector(selectOpenedWalletData, (state) => {

		return state;

});

/**
 * Get wallet height using walletData selector as base
 *
 * @param {string} wallet
 * @returns {MemoizedSelector<unknown, unknown>}
 */
export const selectWalletHeight = createSelector(selectOpenedWalletData, (state) => {
	if (state && state.height) {
		return state.height;
	}
	return null;
});

export const selectWalletTransactions = createSelector(selectOpenedWalletData, (state) => {

		return state.transfers;


});


export const selectWalletCount = createSelector(selectWalletsState, (state) => {
	if (state && state.known_wallets) {
		return state.known_wallets.length;
	}
	return null;
});


