import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LogsState} from './state';

export const selectLogsState = createFeatureSelector<LogsState>('logs');

export const selectLogs = createSelector(selectLogsState, (state) => {
	if (state && state.logs) {
		return state.logs;
	}
	return null;
});

export const selectLogData = (logsType: string) =>
	createSelector(selectLogsState, (state) => {
		if (state && state[logsType]) {
			return state[logsType].logs;
		}
		return null;
	});
