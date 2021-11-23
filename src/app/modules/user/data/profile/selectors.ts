import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from './state.ts';

export const selectProfileState =
	createFeatureSelector<ProfileState>('profile');

export const selectProfile = (id: string) =>
	createSelector(selectProfileState, (state) => {
		if (state && state[id]) {
			return state[id];
		}
		return null;
	});
