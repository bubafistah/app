import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import 'chartjs-adapter-moment';
import {select, Store} from '@ngrx/store';
import colorLib from '@kurkle/color';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {selectChartData} from './data';
import {NetworkHashrateChart} from '@plugin/hashvault/charts/network-hashrate.chart';

@Injectable({
	providedIn: 'root'
})
export class ChartService {
	/**
	 * holds the chart.js instances
	 *
	 * @private
	 */
	private chartInstances: object = {};
	private chartSubscriptions: object = {};
	/**
	 * holds the configurations for each chart type
	 *
	 * @private
	 */
	private chartMeta = {
		networkDifficulty: this.NetworkHashrateChart
	};
	/**
	 * holds all the data observables for all charts
	 *
	 * @private
	 */
	private chartData$: object = {};

	constructor(
		private store: Store<{ payload: any }>,
		@Inject(PLATFORM_ID) private platformId: Object,
		//@TODO try and find a better way than get DI to give us configs, so they can themselves use services
		private NetworkHashrateChart: NetworkHashrateChart
	) {
		if (isPlatformBrowser(this.platformId)) {
			Chart.register(...registerables);
		}
	}

	/**
	 * Loads up a new chart instance,
	 * applies colour adjustments
	 * creates data subscription
	 *
	 * @param name
	 */
	createChart(name: string) {
		const vm = this;
		if (!vm.chartMeta[name]) {
			throw new Error(`Chart Not Defined: ${name}`);
		}

		vm.chartMeta[name].data.datasets.map((dataset, i) => {
			dataset.backgroundColor = colorLib(
				vm.chartMeta[name].options.colors[i]
			)
				.alpha(0.2)
				.rgbString();
			dataset.borderColor = colorLib(
				vm.chartMeta[name].options.colors[i]
			).rgbString();
			// if we have more than one data point, change label colors to match data
			if (vm.chartMeta[name].data.datasets.length > 1) {
				if (
					vm.chartMeta[name].options.scales[dataset.yAxisID]
						.position === 'right'
				) {
					vm.chartMeta[name].options.scales[
						dataset.yAxisID
						].ticks.color = dataset.borderColor;
				}
			}
		});

		vm.chartInstances[name] = new Chart(`lthn-chart-${name}`, {
			type: vm.chartMeta[name].type,
			data: vm.chartMeta[name].data,
			options: vm.chartMeta[name].options
		});

		vm.setupDataSubscription(name);
	}

	/**
	 * Gets the observable for the chart key from the datastore
	 * creates the data subscription, the map function is provided by the
	 * chart config service as a function dataMap(data)
	 *
	 * @param name
	 */
	setupDataSubscription(name: string) {
		//let vm = this
		this.chartData$[name] = this.store.pipe(
			select(selectChartData(this.chartMeta[name].key))
		);

		this.store.dispatch(this.chartMeta[name].pollingStartAction);

		this.chartSubscriptions[name] = this.chartData$[name].subscribe(
			(response) => {
				if (response != undefined) {
					this.chartInstances[name].data.datasets.map((item, i) => {
						this.chartInstances[name].data.datasets[i].data =
							this.chartMeta[name].dataMap(response, i);
					});
					this.chartInstances[name].update();
					if (isPlatformServer(this.platformId)) {
						this.destroySubscriptions(name);
					}
				}
			},
			(error) => {
				//console.log(error);
			}
		);
	}

	destroySubscriptions(name: string): void {
		this.store.dispatch(this.chartMeta[name].pollingStopAction);

		if (isPlatformBrowser(this.platformId)) {
			this.chartSubscriptions[name].unsubscribe();
			this.chartInstances[name].destroy();
			this.chartInstances[name] = void 0;
		}
	}
}
