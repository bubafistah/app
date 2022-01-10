import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'any'
})
export class BaseChartConfigService {
	public key = '';
	public type = '';
	public data: any = {
		datasets: []
	};
	public options = {
		maintainAspectRatio: false,
		//normalized: true,
		colors: ['e2e2e2'],
		animation: false,
		hover: {
			animationDuration: 0 // duration of animations when hovering an item
		},
		responsiveAnimationDuration: 0,
		elements: {
			point: {
				radius: 0
			},
			line: {
				tension: 0,
				borderWidth: 0.5
			}
		},
		scales: {
			x: {
				ticks: {
					callback: undefined
				}
			},
			y: {
				ticks: {
					callback: undefined
				}
			}
		},
		plugins: {
			legend: {
				display: true
			},
			tooltip: {
				callbacks: {}
			}
		}
	};

	constructor() {
		this.configureOptions();
		this.setupCallbacks();
	}

	setupCallbacks() {}

	configureOptions() {}

	addOptions(overrides: object) {
		this.options = { ...this.options, ...overrides };
	}
}
