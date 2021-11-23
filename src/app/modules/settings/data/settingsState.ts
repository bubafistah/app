export interface SettingsState {
	// app layout
	fixedHeader: boolean;
	focusMode: boolean;
	fixedNavigation: boolean;
	minifyNavigation: boolean;
	hideNavigation: boolean;
	topNavigation: boolean;
	boxedLayout: boolean;

	// mobile menu
	pushContent: boolean;
	noOverlay: boolean;
	offCanvas: boolean;

	// accessibility
	biggerContentFont: boolean;
	highContrastText: boolean;
	daltonism: boolean;
	preloaderInside: boolean;
	rtl: boolean;

	// global modifications
	cleanPageBackground: boolean;
	hideNavigationIcons: boolean;
	disableCSSAnimation: boolean;
	hideInfoCard: boolean;
	leanSubheader: boolean;
	hierarchicalNavigation: boolean;

	// global font size
	globalFontSize: string;
	// UI Language
	language: string;
	// UI mode
	darkMode: boolean;
}
