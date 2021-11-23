import {createReducer, on} from '@ngrx/store';
import * as ChartsActions from './actions';
import {ChartDifficultyState} from './interfaces/difficulty.state';

// export const initialState = PoolStatsState;
export const initialState: ChartsState = {
	networkDifficulty: new ChartDifficultyState()
};

const chartDifficultyReducer = createReducer(
	initialState,
	on(
		ChartsActions.chartNetworkDifficultyLoadSuccess,
		(state: any, {networkDifficulty}) => ({
			...state,
			networkDifficulty: {
				...state.networkDifficulty,
				data: networkDifficulty
			}
		})
	),
	on(ChartsActions.chartNetworkDifficultyLoadFailure, (state) => ({
		...state,
		error: true
	}))
);

export function reducer(state, action) {
	return chartDifficultyReducer(state, action);
}

export interface ChartsState {
	networkDifficulty?: ChartDifficultyState;
}
