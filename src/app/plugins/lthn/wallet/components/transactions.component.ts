import {Component, Input, OnInit} from '@angular/core';

import {FormControl} from '@angular/forms';
import {WalletRpcService} from '@service/wallet.rpc.service';
import {Observable} from 'rxjs';
import {GetTransfersIn, GetTransfersOut} from '@plugin/lthn/wallet/interfaces';
import {ColumnMode} from '@swimlane/ngx-datatable';

@Component({
	selector: 'lthn-wallet-transactions',
	templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
	@Input() name?: string = '';
	@Input() opts: GetTransfersIn = {
		in: true,
		out: true,
		pending: true,
		failed: true,
		pool: true,
	};

	filename = new FormControl('');
	password = new FormControl('');

	rows: GetTransfersOut[];



	columns = [
		{name: 'Amount'}, {name: 'Fee'}, {name: 'Height'}, {name: 'Note'}, {name: 'Payment ID'},
		{name: 'Timestamp'}, {name: 'txid'}, {name: 'Type'}, {name: 'Unlock Time'}];

	ColumnMode = ColumnMode;

	constructor(private wallet: WalletRpcService) {

	}

	ngOnInit(): void {
		this.loadTransactions();
	}

	async loadTransactions() {

		this.rows = await this.wallet.getTransfers(this.opts).then((data) => Object.values(data).flat());
		console.log(this.rows);

	}
}
