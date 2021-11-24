import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '@module/auth/route.guard';

const routes: Routes = [
	{
		path: 'settings',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./settings.module').then(
				(m) => m.SettingsModule
			)
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	providers: [AuthGuard],
	exports: [RouterModule]
})
export class SettingsRoutingModule {
}
