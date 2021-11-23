import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';
import { RouterModule, Routes } from '@angular/router';
import { NgTerminalModule } from 'ng-terminal';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
	{
		path: '',
		component: ConsoleComponent,
		data: {
			title: 'Console - Lethean (LTHN)',
			heading: 'lthn Console',
			description: 'Lethean (LTHN) Console',
			robots: false
		}
	}
];

@NgModule({
	declarations: [ConsoleComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgTerminalModule,
		MatCardModule
	]
})
export class ConsoleModule {}
