import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogsComponent} from './logs.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: 'logs',
		component: LogsComponent
	}
];

@NgModule({
	declarations: [LogsComponent],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule, LogsComponent]
})
export class LogsModule {
}
