export interface SettingsState {
	hideNavigation: boolean;
	// accessibility
	biggerContentFont: boolean;
	highContrastText: boolean;
	daltonism: boolean;
	rtl: boolean;
	// global font size
	globalFontSize: string;
	// UI Language
	language: string;
	// UI mode
	darkMode: boolean;
}
