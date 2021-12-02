import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Client} from '@hiveio/dhive';
import {Router} from '@angular/router';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {BlockchainService} from '@plugin/lthn/chain/blockchain.service';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import { isPlatformServer} from '@angular/common';

@Component({
	selector: 'lthn-root',
	templateUrl: './root.component.html'
})
export class RootComponent implements OnInit {
	public posts: any = [];

	public hasCLI: boolean;
	public downloadingCLI: boolean;
	@Inject(PLATFORM_ID) platformId: Object
	public disableConsole = true
	constructor(
		private router: Router,
		private fileSystem: FileSystemService,
		private chain: BlockchainService,
		private wallet: WalletService
	) {
		this.disableConsole = isPlatformServer(this.platformId)
	}

	async ngOnInit() {
		this.fileSystem.listFiles('/users').then((dat: any) => {
			if (dat.length > 0) {
				this.renderAppView();
			} else {
				this.renderFirstRunView();
			}
		});
		this.fileSystem.listFiles('/cli').then((dat: any) => {
			this.hasCLI = dat.length > 0;
		});
	}

	renderAppView() {
	}

	renderFirstRunView() {
		this.router.navigateByUrl('/user');
	}

	downloadCLI() {
		this.downloadingCLI = true
		this.chain.downloadCLI().then((data) => {
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
		const client = new Client([
			'https://api.hive.blog',
			'https://api.hivekings.com',
			'https://anyx.io',
			'https://api.openhive.network'
		]);
		const that = this;
		client.database
			.getDiscussions('trending', {tag: 'dvpn', limit: 5})
			.then(function (discussions) {
				that.posts = discussions;
			});
	}
}
