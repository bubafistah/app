import {createAction, props} from '@ngrx/store';

export const addLog = createAction(
	'[Logs] Add Message',
	props<{ log: string }>()
);
