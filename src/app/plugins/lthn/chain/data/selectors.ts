import { createFeatureSelector, createSelector } from '@ngrx/store';
import {ChainState} from '@plugin/lthn/chain/interfaces/chain';
import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';

/**
 * Wallet Datastore feature name
 *
 * @type {MemoizedSelector<object, WalletsState>}
 */
export const selectChainState = createFeatureSelector<ChainState>('chain');

/**
 * Select known wallets
 *
 * @type {MemoizedSelector<unknown, unknown>}
 */
export const getChainInfo = createSelector(selectChainState, (state) => {

		return state.info;

});

export const getChainBlocks = createSelector(selectChainState, (state) => {

		return state.blocks;

});






