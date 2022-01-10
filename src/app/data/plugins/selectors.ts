import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Plugins} from './state';

export const selectLogsState = createFeatureSelector<Plugins>('plugins');

export const selectPlugins = createSelector(selectLogsState, (state) => {
	if (state && state.loaded_keys) {
		return state.loaded_keys;
	}
	return null;
});


