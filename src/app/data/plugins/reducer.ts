import {createReducer, on} from '@ngrx/store';
import {Plugins} from './state';

import * as PluginActions from './actions';
// here you can configure initial state of your app
// for all your users
export const initialState: Plugins = {
	last_update_check: 0,
	loaded_keys: []
};

const pluginReducer = createReducer(
	initialState,
	on(PluginActions.addPlugin, (state: any, { plugin }) => ({
		...state,
		loaded_keys: {
			...state.loaded_keys,
			plugin
		}
	}))
);

export function reducer(state, action) {
	return pluginReducer(state, action);
}
