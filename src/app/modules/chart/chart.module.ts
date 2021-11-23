import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartDirective} from './chart.directive';
import {ChartService} from './chart.service';

@NgModule({
	declarations: [ChartDirective],
	imports: [CommonModule],
	providers: [ChartService],
	exports: [ChartDirective]
})
export class ChartModule {
}
