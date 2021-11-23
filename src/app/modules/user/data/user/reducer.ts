import {Action, createReducer} from '@ngrx/store';
import {UsersState} from './state';

export const initialState: UsersState = {
	users: {}
};

const userReducer = createReducer(initialState);

export function reducer(state, action) {
	return userReducer(state, action);
}
