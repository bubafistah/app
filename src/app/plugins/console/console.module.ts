import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';
import { NgTerminalModule } from 'ng-terminal';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	declarations: [ConsoleComponent],
	exports: [
		ConsoleComponent
	],
	imports: [
		CommonModule,
		NgTerminalModule,
		MatCardModule,
		MatButtonModule
	]
})
export class ConsoleModule {}
