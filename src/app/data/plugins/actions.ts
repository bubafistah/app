import {createAction, props} from '@ngrx/store';
import {PluginDefinition} from '@data/plugins/state';

export const addPlugin = createAction(
	'[Plugins] Adding Plugin',
	props<{ plugin: PluginDefinition }>()
);

export const getPluginList = createAction(
	'[Plugins] Get Plugin list'
)
