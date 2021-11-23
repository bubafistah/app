import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ChartsState} from './reducer';

export const selectChartsState = createFeatureSelector<ChartsState>('charts');

export const selectChart = (chartType: string) =>
	createSelector(selectChartsState, (state) => {
		if (state && state[chartType]) {
			return state[chartType];
		}
		return null;
	});

export const selectChartData = (chartType: string) =>
	createSelector(selectChartsState, (state) => {
		if (state && state[chartType]) {
			return state[chartType].data;
		}
		return null;
	});

export const selectChartOptions = (chartType: string) =>
	createSelector(selectChartsState, (state) => {
		if (state && state[chartType]) {
			return state[chartType].options;
		}
		return null;
	});
