import {createReducer, on} from '@ngrx/store';

import * as ChainActions from './actions';
import {ChainState} from '@plugin/lthn/chain/interfaces/chain';

export const initialState: ChainState = new ChainState

const chainReducer = createReducer(
	initialState,
	on(ChainActions.ChainSetGetInfo, (state: any, { info }) => ({
		...state,
		info
	})),
	on(ChainActions.ChainSetTransactions, (state: any, { transactions }) => ({
		...state,
		transactions
	})),
	on(ChainActions.ChainSetBlocks, (state: any, { blocks }) => ({
		...state,
		blocks
	})),



);

export function reducer(state, action) {
	return chainReducer(state, action);
}
