import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersState} from './state';

export const selectUserState = createFeatureSelector<UsersState>('users');

export const selectUserByID = (id: string) =>
	createSelector(selectUserState, (state) => {
		if (state && state[id]) {
			return state[id];
		}
		return null;
	});
