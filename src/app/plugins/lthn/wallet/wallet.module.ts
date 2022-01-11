import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletComponent} from './wallet.component';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterModule, Routes} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {NewComponent} from './components/new.component';
import {RestoreComponent} from './components/restore.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {OpenComponent} from '@plugin/lthn/wallet/components/open.component';
import {TransactionsComponent} from '@plugin/lthn/wallet/components/transactions.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatSelectModule} from '@angular/material/select';
import {AddComponent} from './components/add.component';
import {PipesModule} from '@pipe/pipes.module';


const routes: Routes = [
	{
		path: 'wallets',
		component: WalletComponent,
		data: {
			title: 'view.wallets.title',
			heading: 'view.wallets.heading',
			description: 'view.wallets.description',
			robots: true
		}
	}
];

@NgModule({
	declarations: [
		WalletComponent,
		NewComponent,
		RestoreComponent,
		OpenComponent,
		TransactionsComponent,
		AddComponent
	],
	exports: [
		NewComponent,RestoreComponent,TransactionsComponent,OpenComponent,RouterModule,AddComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatCardModule,
		FlexModule,
		ReactiveFormsModule,
		MatListModule,
		MatButtonModule,
		MatCheckboxModule,
		MatExpansionModule,
		MatToolbarModule,
		MatIconModule,
		MatTooltipModule,
		MatInputModule,
		TranslateModule,
		NgxDatatableModule,
		MatSelectModule,
		MatTabsModule,
		PipesModule
	]
})
export class WalletModule {}
