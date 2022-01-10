import {createReducer, on} from '@ngrx/store';
import * as SettingsActions from './settings.actions';
import {SettingsState} from './settingsState';

// here you can configure initial state of your app
// for all your users
export const initialState: SettingsState = {
	// app layout
	hideNavigation: true,
	// accessibility
	biggerContentFont: false,
	highContrastText: false,
	daltonism: false,
	rtl: false,
	// global font size
	globalFontSize: 'md',
	// UI Language
	language: 'en',
	// UI mode
	darkMode: true
};

const settingsReducer = createReducer(
	initialState,
	on(SettingsActions.changeLanguage, (state, action) => ({
		...state,
		language: action.language
	})),
	on(SettingsActions.toggleDarkMode, (state) => ({
		...state,
		darkMode: !state.darkMode
	})),
	on(SettingsActions.toggleHideNavigation, (state) => ({
		...state,
		hideNavigation: !state.hideNavigation
	}))
);

export function reducer(state, action) {
	return settingsReducer(state, action);
}
