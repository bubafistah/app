import {createAction, props} from '@ngrx/store';
import {ChartDifficulty} from './interfaces/difficulty.state';

/**
 * Network Hashrate / Diff chart
 */

export const chartNetworkDifficultyStartPolling = createAction(
	'[Charting] Chart Network Difficulty Start polling'
);
export const chartNetworkDifficultyStopPolling = createAction(
	'[Charting] Chart Network Difficulty Stop polling'
);
export const chartNetworkDifficultyStoppedPolling = createAction(
	'[Charting] Chart Network Difficulty Stopped Polling'
);
export const chartNetworkDifficultyLoadRequested = createAction(
	'[Charting] Chart Network Difficulty Load requested'
);
export const chartNetworkDifficultyLoadSuccess = createAction(
	'[Charting] ChartDifficulty Load Success',
	props<{ networkDifficulty: ChartDifficulty[] }>()
);
export const chartNetworkDifficultyLoadFailure = createAction(
	'[Charting] ChartDifficulty Load Failure',
	props<{ error: any }>()
);
