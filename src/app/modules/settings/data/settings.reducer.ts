import {Action, createReducer, on} from '@ngrx/store';
import * as SettingsActions from './settings.actions';
import {SettingsState} from './settingsState';

// here you can configure initial state of your app
// for all your users
export const initialState: SettingsState = {
	// app layout
	fixedHeader: true,
	fixedNavigation: true,
	focusMode: false,
	minifyNavigation: false,
	hideNavigation: false,
	topNavigation: false,
	boxedLayout: false,

	// mobile menu
	pushContent: false,
	noOverlay: false,
	offCanvas: false,

	// accessibility
	biggerContentFont: false,
	highContrastText: false,
	daltonism: false,
	preloaderInside: false,
	rtl: false,

	// global modifications
	cleanPageBackground: false,
	hideNavigationIcons: false,
	disableCSSAnimation: false,
	hideInfoCard: false,
	leanSubheader: false,
	hierarchicalNavigation: false,

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
	on(SettingsActions.toggleFocusMode, (state) => ({
		...state,
		focusMode: !state.focusMode
	})),
	on(SettingsActions.toggleHideNavigation, (state) => ({
		...state,
		hideNavigation: !state.hideNavigation
	})),
	on(SettingsActions.appReset, () => ({...initialState}))
);

export function reducer(state, action) {
	return settingsReducer(state, action);
}
