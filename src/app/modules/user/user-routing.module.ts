import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/route.guard';

const routes: Routes = [
	{
		path: 'user',
		loadChildren: () =>
			import('./user.module').then((m) => m.UserModule)
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	providers: [AuthGuard],
	exports: [RouterModule]
})
export class UserRoutingModule {
}
