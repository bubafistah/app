import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SettingsState} from './settingsState';

export const selectSettingsState =
	createFeatureSelector<SettingsState>('settings');

// use this selector to get current language from app state
export const selectLanguage = createSelector(
	selectSettingsState,
	(state: SettingsState) => state.language
);

export const selectDarkMode = createSelector(
	selectSettingsState,
	(state: SettingsState) => state.darkMode
);
export const selectFocusMode = createSelector(
	selectSettingsState,
	(state: SettingsState) => state.focusMode
);

/**
 * returns true if hide navigation is false
 */
export const selectMenuVisibility = createSelector(
	selectSettingsState,
	(state: SettingsState) => state.hideNavigation !== true
);
