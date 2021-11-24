import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../modules/auth/route.guard';

const routes: Routes = [
	{
		path: 'console',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./console.module').then((m) => m.ConsoleModule)
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	providers: [AuthGuard],
	exports: [RouterModule]
})
export class ConsoleRoutingModule {
}
