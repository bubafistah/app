import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@module/auth/route.guard';

const routes: Routes = [
	{
		path: 'wallet',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./wallet.module').then((m) => m.WalletModule)
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	providers: [AuthGuard],
	exports: [RouterModule]
})
export class WalletRoutingModule {
}
