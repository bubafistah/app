import {createAction, props} from '@ngrx/store';

export const toggleHideNavigation = createAction('[Settings] Toggle Hide Navigation');
export const toggleBiggerContentFont = createAction('[Settings] Toggle Bigger Content Font');
export const toggleHighContrastText = createAction('[Settings] Toggle High Contrast Text');
export const toggleDaltonism = createAction('[Settings] Toggle Daltonism');
export const toggleRtl = createAction('[Settings] Toggle RTL');
export const setGlobalFontSize = createAction(
	'[Settings] Set Global Font Size',
	props<{ size: string }>()
);
export const changeLanguage = createAction(
	'[Settings] Change Language',
	props<{ language: string }>()
);

export const toggleDarkMode = createAction('[Settings] Toggle Dark Mode');

export const SettingsActionTypes: string[] = [
	toggleHideNavigation.type,
	toggleBiggerContentFont.type,
	toggleHighContrastText.type,
	toggleDaltonism.type,
	toggleRtl.type,
	setGlobalFontSize.type,
	changeLanguage.type,
	toggleDarkMode.type
];
