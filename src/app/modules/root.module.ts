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
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
	declarations: [RootComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		FlexModule,
		ConsoleModule,
		MatTabsModule,
		WalletModule,
		TranslateModule,
		MatDividerModule
	]
})
export class RootModule {
}
