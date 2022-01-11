import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {BlockchainService} from '@plugin/lthn/chain/blockchain.service';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {select, Store} from '@ngrx/store';
import {getChainBlocks, getChainInfo} from '@plugin/lthn/chain/data';
import {ChainGetInfo} from '@plugin/lthn/chain/interfaces/props/get_info';
import {interval, Observable, Subscription} from 'rxjs';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {BlockHeader} from '@plugin/lthn/chain/interfaces/types/blockHeader';

@Component({
	selector: 'lthn-root',
	templateUrl: './root.component.html'
})
export class RootComponent implements OnInit, OnDestroy {
	public posts: any = [];

	public hasCLI: boolean;
	public loaded: boolean = false;
	public downloadingCLI: boolean;
	public block_timestamp;
	public chainInfo: Observable<ChainGetInfo>;
	ColumnMode = ColumnMode;
	public blocks: Observable<{ headers: BlockHeader[]}>;
	private sub: Subscription[] = [];


	constructor(
		private router: Router,
		private fileSystem: FileSystemService,
		private chain: BlockchainService,
		private wallet: WalletService,
		private store: Store
	) {

	}

	public ngOnDestroy() {
		this.sub.forEach((s) => s.unsubscribe())
	}

	ngOnInit() {
		this.fileSystem.listFiles('/users').then((dat: any) => {
			if (dat.length > 0) {
				this.renderAppView();
			} else {
				this.renderFirstRunView();
			}
		});
		this.fileSystem.listFiles('/cli').then((dat: any) => {
			this.hasCLI = dat.length > 0;
			this.chain.getInfo()
			this.sub['interval'] = interval(5000).subscribe(() => this.chain.getInfo());

		});

		this.sub['info'] = this.store.pipe(select(getChainInfo)).subscribe((data) => {
			if(data) {
				this.loaded = true;
				this.chain.getBlocks(data.height-10, data.height-1)
			}
		})
	}



	renderAppView() {

		this.chainInfo = this.store.pipe(select(getChainInfo))
		this.blocks = this.store.pipe(select(getChainBlocks))

		this.blocks.subscribe((blocks) => {
			this.block_timestamp = blocks.headers[0].timestamp
		})
	}

	renderFirstRunView() {
		this.router.navigateByUrl('/user');
	}

	async downloadCLI() {
		this.downloadingCLI = true
		await new Promise(f => setTimeout(f, 1000));
		this.chain.downloadCLI().then(() => {
			this.downloadingCLI = false;
			this.router.navigateByUrl('/chain')
		});
	}

	startBlockchain() {
		return this.chain.startDaemon();
	}

	startWallet() {
		return this.wallet.startWallet();
	}

	renderWebView() {
//		const client = new Client([
//			'https://api.hive.blog',
//			'https://api.hivekings.com',
//			'https://anyx.io',
//			'https://api.openhive.network'
//		]);
//		const that = this;
//		client.database
//			.getDiscussions('trending', {tag: 'dvpn', limit: 5})
//			.then(function (discussions) {
//				that.posts = discussions;
//			});
	}
}
