import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockchainComponent} from './blockchain.component';
import {ChartModule} from '../../../modules/chart/chart.module';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
	{
		path: '',
		component: BlockchainComponent,
		data: {
			title: 'view.chain.title',
			heading: 'view.chain.heading',
			description: 'view.chain.description',
			robots: false
		}
	}
];

@NgModule({
	declarations: [BlockchainComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ChartModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		FlexModule,
		TranslateModule
	],
	exports: [RouterModule]
})
export class BlockchainModule {
}
