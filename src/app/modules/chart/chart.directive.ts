import {AfterViewInit, Directive, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, Renderer2} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ChartService} from './chart.service';

@Directive({
	selector: '[lthnChart]',
	providers: [ChartService]
})
export class ChartDirective implements AfterViewInit, OnDestroy {
	@Input() lthnChart: string;
	private chartElement: any;

	constructor(
		private renderer: Renderer2,
		private elmRef: ElementRef,
		private chartService: ChartService,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
	}

	ngAfterViewInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.createChartElement(this.lthnChart);
			this.chartService.createChart(this.lthnChart);
		}
	}

	createChartElement(name: string) {
		this.chartElement = this.renderer.createElement('canvas');
		this.renderer.setAttribute(
			this.chartElement,
			'id',
			`lthn-chart-${name}`
		);
		this.renderer.setStyle(this.elmRef.nativeElement, 'height', '25vh');
		this.renderer.setStyle(
			this.elmRef.nativeElement,
			'position',
			'relative'
		);

		// position: relative; height:40vh; width:80vw
		this.renderer.appendChild(this.elmRef.nativeElement, this.chartElement);
	}

	ngOnDestroy(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.renderer.removeChild(
				this.elmRef.nativeElement,
				this.chartElement
			);
		}
		this.chartService.destroySubscriptions(this.lthnChart);
	}
}
