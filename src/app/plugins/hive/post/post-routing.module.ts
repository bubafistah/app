import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
	{
		path: 'p',
		loadChildren: () => import('./post.module').then((m) => m.PostModule)
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PostRoutingModule {}
