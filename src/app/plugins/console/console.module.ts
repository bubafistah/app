import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';
import { NgTerminalModule } from 'ng-terminal';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [ConsoleComponent],
	exports: [
		ConsoleComponent
	],
	imports: [
		CommonModule,
		NgTerminalModule,
		MatCardModule
	]
})
export class ConsoleModule {}
