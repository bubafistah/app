import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsoleComponent} from './console.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
	declarations: [ConsoleComponent],
	exports: [
		ConsoleComponent
	],
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		FlexModule
	]
})
export class ConsoleModule {}
