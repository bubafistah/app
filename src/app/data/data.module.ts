import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {effects, metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {APP_CONFIG} from '@env/environment';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {EntityDataModule} from '@ngrx/data';
import {entityConfig} from './entity-metadata';

@NgModule({
	declarations: [],
	imports: [
		StoreModule.forRoot(reducers, {
			metaReducers
		}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: APP_CONFIG.production,
			actionsBlocklist: ['@ngrx/router*']
		}),
		EffectsModule.forRoot([...effects]),
		StoreRouterConnectingModule.forRoot(),
		EntityDataModule.forRoot(entityConfig)
	]
})
export class DataModule {
}
