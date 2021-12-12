import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChartService} from '@module/chart/chart.service';
import {APP_CONFIG} from '@env/environment';
import {rpcBody} from '@service/json-rpc';
import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';
import {BlockchainService} from '@plugin/lthn/chain/blockchain.service';
import {Store} from '@ngrx/store';
import {ChainSetGetInfo} from '@plugin/lthn/chain/data';

@Component({
	selector: 'lthn-chain',
	templateUrl: './blockchain.component.html',
	styleUrls: ['./blockchain.component.scss'],
	providers: [ChartService]
})
export class BlockchainComponent implements OnInit, OnDestroy {
	public recentTxs: any;
	public buildType: string;

	constructor(private http: HttpClient, private store: Store, private chain: BlockchainService) {
	}


	ngOnInit(): void {
		// https://lethean.hashvault.pro/explorer/api/transactions
		this.http
			.get<any>('https://lethean.hashvault.pro/explorer/api/transactions')
			.subscribe((data) => {
				this.recentTxs = data.data.blocks;
			});
		this.chain.getInfo()

	}

	ngOnDestroy(): void {
		console.log('BlockchainComponent DESTROY');
	}
}
