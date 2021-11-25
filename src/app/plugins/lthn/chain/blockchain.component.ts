import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChartService} from '@module/chart/chart.service';
import {APP_CONFIG} from '@env/environment';

@Component({
	selector: 'lthn-chain',
	templateUrl: './blockchain.component.html',
	styleUrls: ['./blockchain.component.scss'],
	providers: [ChartService]
})
export class BlockchainComponent implements OnInit, OnDestroy {
	public recentTxs: any;
	public buildType: string;

	constructor(private http: HttpClient) {
	}

	public get isWeb() {
		return (
			APP_CONFIG.environment === 'WEB' || APP_CONFIG.environment === 'DEV'
		);
	}

	public get isApp() {
		return APP_CONFIG.environment === 'APP';
	}

	ngOnInit(): void {
		// https://lethean.hashvault.pro/explorer/api/transactions
		this.http
			.get<any>('https://lethean.hashvault.pro/explorer/api/transactions')
			.subscribe((data) => {
				this.recentTxs = data.data.blocks;
			});
	}

	ngOnDestroy(): void {
		console.log('BlockchainComponent DESTROY');
	}
}
