import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RootComponent} from './root.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {ConsoleModule} from '@plugin/console/console.module';
import {MatTabsModule} from '@angular/material/tabs';
import {WalletModule} from '@plugin/lthn/wallet/wallet.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {ReactiveComponentModule} from '@ngrx/component';
import {PipesModule} from 'app/pipes/pipes.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
	declarations: [RootComponent],
	exports: [
	],
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		FlexModule,
		MatTabsModule,
		WalletModule,
		TranslateModule,
		MatDividerModule,
		ConsoleModule,
		MatProgressSpinnerModule,
		MatListModule,
		ReactiveComponentModule,
		PipesModule,
		NgxDatatableModule,
		MatIconModule
	]
})
export class RootModule {
}
