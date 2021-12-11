import {Component, Input, OnInit} from '@angular/core';

import {FormControl} from '@angular/forms';
import {WalletRpcService} from '@service/wallet.rpc.service';
import {Observable, Subscription} from 'rxjs';
import {GetTransfersIn, GetTransfersOut} from '@plugin/lthn/wallet/interfaces';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {select, Store} from '@ngrx/store';
import {selectWalletTransactions} from '@plugin/lthn/wallet/data';

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
	private subs$: Subscription[] = []
	constructor(private wallet: WalletRpcService, private store: Store) {

	}

	ngOnInit(): void {
		this.subs$['txn'] = this.store.pipe(select(selectWalletTransactions)).subscribe((data) => {
			if(data) {
				this.rows = [...data['in'], ...data['out']]
			}
		})
		//this.loadTransactions();
	}

	async loadTransactions() {

		this.rows = await this.wallet.getTransfers(this.opts).then((data) => Object.values(data).flat());
		console.log(this.rows);

	}
}
