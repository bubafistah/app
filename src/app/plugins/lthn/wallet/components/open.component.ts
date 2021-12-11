import {Component, Input, OnInit} from '@angular/core';

import {FormControl} from '@angular/forms';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {NotifierService} from 'angular-notifier';
import {addWallet, openWallet} from '@plugin/lthn/wallet/data';
import {Store} from '@ngrx/store';

@Component({
	selector: 'lthn-wallet-open',
	templateUrl: './open.component.html'
})
export class OpenComponent implements OnInit {
	@Input() name?: string = '';

	filename = new FormControl('');
	password = new FormControl('');
	/**
	 * Lists the wallets known
	 *
	 * @type {string[]}
	 */
	public wallets: string[];


	constructor(private wallet: WalletService, private store: Store, private notifierService: NotifierService) {

	}

	/**
	 * get list of filesystem wallets
	 */
	ngOnInit(): void {
		this.wallets = this.wallet.getWalletList()
	}

	/**
	 * Unlock wallet
	 *
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	unlockWallet(name: string) {
		this.store.dispatch(openWallet({address: name, password: (<HTMLInputElement>document.getElementById(name + '-pass')).value}))
//		return this.wallet.openWallet({
//			filename: name,
//			password:
//		}).then(() => this.notifierService.notify('success', 'Loaded Wallet: ' + name));

	}
}
