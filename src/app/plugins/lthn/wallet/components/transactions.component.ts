import {Component, Input, OnInit} from '@angular/core';

import {FormControl} from '@angular/forms';
import {WalletRpcService} from '@service/wallet.rpc.service';

@Component({
	selector: 'lthn-wallet-transactions',
	templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
	@Input() name?: string = '';

	filename = new FormControl('');
	password = new FormControl('');

	constructor(private wallet: WalletRpcService) {

	}

	ngOnInit(): void {
		this.loadTransactions()
	}

	loadTransactions() {

		return this.wallet.getTransfers({
			in: true
		}).then((data) => console.log(data['data'].result));

	}
}
