import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from '@module/chart/chart.service';
import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';
import {BlockchainService} from '@plugin/lthn/chain/blockchain.service';
import {select, Store} from '@ngrx/store';
import {getChainBlocks, getChainInfo} from '@plugin/lthn/chain/data';
import {interval, Observable, Subscription} from 'rxjs';
import {BlockHeader} from '@plugin/lthn/chain/interfaces/types/blockHeader';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {HashRatePipe} from '@pipe/crypto/hashrate.pipe';

@Component({
	selector: 'lthn-chain',
	templateUrl: './blockchain.component.html',
	providers: [ChartService]
})
export class BlockchainComponent implements OnInit, OnDestroy {

	columns: any = []

	public allColumns = [
		{ prop: 'height', name: 'plugin.lthn.chain.table.th.height', default: true},
		{ prop: 'difficulty', name: 'plugin.lthn.chain.table.th.difficulty', default: true },
		{ prop: 'hash', name: 'plugin.lthn.chain.table.th.hash', default: true  },
		{ prop: 'orphan_status', name: 'plugin.lthn.chain.table.th.orphan_status', default: true },
		{ prop: 'reward', name: 'plugin.lthn.chain.table.th.reward', default: true },
		{ prop: 'timestamp', name: 'plugin.lthn.chain.table.th.timestamp', default: true },
	//	{ prop: 'block_size', name: 'Block Size', default: true },
		{ prop: 'depth', name: 'plugin.lthn.chain.table.th.depth', default: true },
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

		this.fileSystem.listFiles('/cli').then(() => {
			this.chain.getInfo()
			interval(15000).subscribe(() => {
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
