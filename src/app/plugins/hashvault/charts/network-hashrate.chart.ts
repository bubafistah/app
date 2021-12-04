import {Injectable} from '@angular/core';
import * as ChartsActions from '@module/chart/data/actions';
import {BaseChartConfigService} from '@module/chart/base-chart-config.service';
import {ChartConfigInterface} from '@module/chart/chart-config.interface';

@Injectable({
	providedIn: 'any'
})
export class NetworkHashrateChart
	extends BaseChartConfigService
	implements ChartConfigInterface {
	public pollingStartAction =
		ChartsActions.chartNetworkDifficultyStartPolling();
	public pollingStopAction =
		ChartsActions.chartNetworkDifficultyStopPolling();
	public key = 'networkDifficulty';
	public type = 'line';
	public data = {
		datasets: [
			{
				label: 'Dataset with string point data',
				fill: true,
				backgroundColor: null,
				borderColor: null,
				color: null,
				data: []
			}
		]
	};

	configureOptions() {
		this.addOptions({
			parsing: false,
			spanGaps: true,
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}
			},
			scales: {
				x: {
					title: 'time',
					type: 'timeseries',
					time: {
						displayFormats: {
							day: 'D MMM'
						},
						unit: 'day'
					},
					ticks: {
						source: 'data',
						font: {
							size: 10,
							family: 'Source Sans Pro'
						},
						color: 'white',
						padding: 2,
						bounds: 'data',
						maxRotation: 0
					},
					gridLines: {
						display: false,
						lineWidth: 0,
						drawBorder: false,
						zeroLineWidth: 0,
						offsetGridLines: false,
						tickMarkLength: 0
					}
				},
				y: {
					title: 'hashrate',
					ticks: {
						callback: null,
						font: {
							family: 'Source Sans Pro',
							size: 10
						},
						color: 'white',
						mirror: true,
						padding: 4
					},
					position: 'left',
					gridLines: {
						display: true,
						lineWidth: 1,
						drawBorder: false,
						zeroLineWidth: 0,
						tickMarkLength: 0,
						color: 'rgba(255, 255, 255, 0.1)'
					}
				}
			},
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					position: 'nearest',
					mode: 'index',
					intersect: false,
					caretSize: 4,
					backgroundColor: 'e2e2e2',
					borderColor: 'rgba(255,255,255,0.5)',
					borderWidth: 1,
					displayColors: false,
					callbacks: {}
				},
				decimation: {
					enabled: true,
					algorithm: 'lttb',
					samples: 50
				}
			},
			colors: ['#1c9ea3']
		});
	}

	setupCallbacks() {
		const vm = this;
		// this.options.scales.y.ticks.callback = function (value, index, values) {
		//     return vm.hashratePipe.transform(value);
		// };
		//
		// this.options.plugins.tooltip.callbacks = {
		//     label: context => `Hashrate: ${vm.hashratePipe.transform(context.parsed.y)}`
		// };
	}

	dataMap(data, i) {
		const vm = this;
		return data.map((n: any) => ({
			x: n.ts,
			y: Math.floor(n.diff / 120)
		}));
	}
}
