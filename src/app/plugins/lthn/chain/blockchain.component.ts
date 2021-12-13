import {Component, OnDestroy, OnInit, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChartService} from '@module/chart/chart.service';
import {APP_CONFIG} from '@env/environment';
import {rpcBody} from '@service/json-rpc';
import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';
import {BlockchainService} from '@plugin/lthn/chain/blockchain.service';
import {select, Store} from '@ngrx/store';
import {ChainSetGetInfo, getChainBlocks, getChainInfo} from '@plugin/lthn/chain/data';
import {interval, Observable, Subscription} from 'rxjs';
import {BlockHeader} from '@plugin/lthn/chain/interfaces/types/blockHeader';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {HashRatePipe} from 'app/pipes/crypto/hashrate.pipe';

@Component({
	selector: 'lthn-chain',
	templateUrl: './blockchain.component.html',
	styleUrls: ['./blockchain.component.scss'],
	providers: [ChartService]
})
export class BlockchainComponent implements OnInit, OnDestroy {

	columns: any = []

	public allColumns = [
		{ prop: 'height', name: 'Height', default: true},
		{ prop: 'difficulty', name: 'Difficulty', default: true },
		{ prop: 'hash', name: 'Hash', default: true  },
		{ prop: 'orphan_status', name: 'Valid', default: true },
		{ prop: 'reward', name: 'Reward', default: true },
		{ prop: 'timestamp', name: 'Timestamp', default: true },
	//	{ prop: 'block_size', name: 'Block Size', default: true },
		{ prop: 'depth', name: 'Depth', default: true },
		//{ prop: 'major_version', name: 'Block Major Version', default: true },
	//	{ prop: 'minor_version', name: 'Block Minor Version', default: false },
	//	{ prop: 'nonce', name: 'Block Nonce', default: false },
	//	{ prop: 'num_txes', name: 'Transactions', default: true },
	//	{ prop: 'prev_hash', name: 'Last Hash', default: true },
	]
	ColumnMode = ColumnMode;
	public blocks: Observable<{ headers: BlockHeader[]}>;
	public chainInfo: Observable<ChainGetInfo>;

	public recentTxs: any;
	public buildType: string;
	private sub: Subscription;

	constructor(private fileSystem: FileSystemService, private store: Store, private chain: BlockchainService,
				public pipeHashrate: HashRatePipe) {

		this.allColumns.forEach((col) => {
			if (col.default){

				this.columns.push(
					col
				)
			}
		})
	}


	ngOnInit(): void {

		this.chain.getInfo()

		this.fileSystem.listFiles('/cli').then((dat: any) => {
			this.chain.getInfo()
			interval(15000).subscribe(n => {
				this.chain.getInfo()
			});

		});

		this.sub = this.store.pipe(select(getChainInfo)).subscribe((data) => {
			if(data) this.chain.getBlocks(data.height-25, data.height-1)
		})
		this.chainInfo = this.store.pipe(select(getChainInfo))
		this.blocks = this.store.pipe(select(getChainBlocks))

	}

	toggle(col) {
		const isChecked = this.isChecked(col);

		if (isChecked) {
			this.columns = this.columns.filter(c => {
				return c.name !== col.name;
			});
		} else {
			this.columns.push(col);
		}
	}

	isChecked(col) {
		return (
			this.columns.find(c => {
				return c.name === col.name;
			}) !== undefined
		);
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe()
		console.log('BlockchainComponent DESTROY');
	}
}
