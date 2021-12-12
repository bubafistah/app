import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@module/auth/route.guard';

const routes: Routes = [
	{
		path: 'chain',
		//canActivate: [AuthGuard],
		loadChildren: () =>
			import('./blockchain.module').then((m) => m.BlockchainModule)
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	providers: [AuthGuard],
	exports: [RouterModule]
})
export class BlockchainRoutingModule {
}
