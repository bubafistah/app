import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {APP_CONFIG} from '@env/environment';
import * as Settings from '../../modules/settings/data';
import * as User from '../../modules/user/data/user';
import {localStorageSync} from 'ngrx-store-localstorage';
import * as Chart from '../../modules/chart/data';
import * as Logs from '../logs';
import {WebStorageService} from '@service/web-storage.service';

export interface AppState {
	settings: Settings.SettingsState;
	charts: Chart.ChartsState;
	user: User.UsersState;
	logs: Logs.LogsState;
}

export const reducers: ActionReducerMap<AppState> = {
	settings: Settings.reducer,
	charts: Chart.reducer,
	user: User.reducer,
	logs: Logs.reducer
};

export function localStorageSyncReducer(
	reducer: ActionReducer<any>
): ActionReducer<any> {
	return localStorageSync({
		keys: [
			'settings',
			{
				user: {
					encrypt: (state: string) => btoa(state), // placeholder
					decrypt: (state: string) => atob(state) // placeholder
				}
			}
		],
		rehydrate: true,
		removeOnUndefined: true,
		storage:  new WebStorageService()
	})(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !APP_CONFIG.production
	? []
	: [localStorageSyncReducer];

export const effects = [Chart.ChartsEffects, Settings.SettingsEffects ];
