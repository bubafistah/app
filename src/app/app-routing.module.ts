import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostRoutingModule} from '@plugin/hive/post/post-routing.module';
import {BlockchainRoutingModule} from '@plugin/lthn/chain/blockchain-routing.module';
import {UserRoutingModule} from './modules/user/user-routing.module';
import {RootRoutingModule} from './modules/root-routing.module';
import {SettingsRoutingModule} from './modules/settings/settings-routing.module';
import {WalletRoutingModule} from '@plugin/lthn/wallet/wallet-routing.module';
import {LoginComponent} from './auth/login.component';
import {ConsoleRoutingModule} from '@plugin/console/console-routing.module';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		pathMatch: 'full',
		data: {
			title: 'Login - Lethean (LTHN)',
			heading: 'Login',
			description: 'Lethean (LTHN) Login',
			robots: true
		}
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
		PostRoutingModule,
		BlockchainRoutingModule,
		UserRoutingModule,
		SettingsRoutingModule,
		WalletRoutingModule,
		ConsoleRoutingModule,
		// Make sure Root is the last in the list, it has a catch all
		RootRoutingModule
	],
	exports: [RouterModule]
})
/**
 * Application routing bootstrap file, adds all routes as lazy loaded modules
 */
export class AppRoutingModule {
}
