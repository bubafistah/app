import { Action, createReducer, on } from '@ngrx/store';
import { LogsState } from './state';

import * as LogsActions from './actions';
// here you can configure initial state of your app
// for all your users
export const initialState: LogsState = {
	logs: []
};

const profileReducer = createReducer(
	initialState,
	on(LogsActions.addLog, (state: any, { log }) => ({
		...state,
		logs: {
			...state.logs,
			log
		}
	}))
);

export function reducer(state, action) {
	return profileReducer(state, action);
}
