import {Action, ActionReducer, INIT} from '@ngrx/store';

import * as actions from './settings.actions';
import {SettingsState} from './settingsState';

let body: HTMLBodyElement;

// meta reducer that applies layout classes based on data reducer
export function settingsMetaReducer(
	reducer: ActionReducer<any>
): ActionReducer<any> {
	return (state: { settings: SettingsState }, action: Action) => {
		// build new state
		const result = reducer(state, action);

		// use our middleware only for INIT action and for Settings actions
		if (
			action.type === INIT ||
			actions.SettingsActionTypes.includes(action.type)
		) {
			handleCssClasses(result.settings, action);
		}

		// pass state into next chain
		return result;
	};
}

function handleClassCondition(
	condition: boolean,
	className: string,
	el: HTMLElement
) {
	if (!condition && el.classList.contains(className)) {
		el.classList.remove(className);
	}
	if (condition && !el.classList.contains(className)) {
		el.classList.add(className);
	}
}

function handleCssClasses(state: SettingsState, action: Action) {
	handleClassCondition(state.darkMode, 'dark-mode', body);
	handleClassCondition(!state.darkMode, 'light-mode', body);
}
