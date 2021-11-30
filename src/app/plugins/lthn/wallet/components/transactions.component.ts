import {Component, Input, OnInit} from '@angular/core';

import {FormControl} from '@angular/forms';
import {WalletRpcService} from '@service/wallet.rpc.service';
import {Observable} from 'rxjs';
import {GetTransfersOut} from '@plugin/lthn/wallet/interfaces';
import {ColumnMode} from '@swimlane/ngx-datatable';

@Component({
	selector: 'lthn-wallet-transactions',
	templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
	@Input() name?: string = '';

	filename = new FormControl('');
	password = new FormControl('');

	rows: GetTransfersOut[];


	columns = [
		{name: 'Amount'}, {name: 'Fee'}, {name: 'Height'}, {name: 'Note'}, {name: 'Payment ID'},
		{name: 'Timestamp'}, {name: 'txid'}, {name: 'type'}, {name: 'unlock_time'}];

	ColumnMode = ColumnMode;

	constructor(private wallet: WalletRpcService) {

	}

	ngOnInit(): void {
		this.loadTransactions();
	}

	async loadTransactions() {

		this.rows = await this.wallet.getTransfers({
			in: true
		}).then((data) => data['in']);
		console.log(this.rows);

	}
}
