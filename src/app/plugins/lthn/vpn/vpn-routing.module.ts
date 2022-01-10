import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {VpnComponent} from './vpn.component';

const routes: Routes = [
	{
		path: 'vpn',
		component: VpnComponent
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VpnRoutingModule {}
