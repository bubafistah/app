import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RootComponent} from './root.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AuthGuard} from './auth/route.guard';
import {FlexModule} from '@angular/flex-layout';
import {ConsoleModule} from '@plugin/console/console.module';
import {MatTabsModule} from '@angular/material/tabs';
import {WalletModule} from '@plugin/lthn/wallet/wallet.module';
import {TranslateModule} from '@ngx-translate/core';


const routes: Routes = [
	{
		path: '',
		component: RootComponent,
		canActivate: [AuthGuard],
		pathMatch: 'full',
		data: {
			title: 'Lethean (LTHN)',
			heading: 'Lethean Dashboard',
			description: 'Lethean (LTHN) Web app',
			robots: true
		}
	}
];

@NgModule({
	declarations: [RootComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatCardModule,
		MatButtonModule,
		FlexModule,
		ConsoleModule,
		MatTabsModule,
		WalletModule,
		TranslateModule
	]
})
export class RootModule {
}
