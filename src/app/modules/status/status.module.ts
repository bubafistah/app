import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatusComponent} from './status.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {NoDaemonRunningDialog} from './dialog/no-daemon-running.component';

@NgModule({
	declarations: [StatusComponent, NoDaemonRunningDialog],
	exports: [StatusComponent],
	imports: [
		CommonModule,
		MatDialogModule,
		MatIconModule,
		MatCardModule,
		MatButtonModule,
		MatTooltipModule
	]
})
export class StatusModule {
}
