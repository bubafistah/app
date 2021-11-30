import {Component, Input, OnInit} from '@angular/core';

import {FormControl} from '@angular/forms';
import {WalletRpcService} from '@service/wallet.rpc.service';

@Component({
	selector: 'lthn-wallet-open',
	templateUrl: './open.component.html'
})
export class OpenComponent implements OnInit {
	@Input() name?: string = '';

	filename = new FormControl('');
	password = new FormControl('');

	constructor(private wallet: WalletRpcService) {

	}

	ngOnInit(): void {

	}

	unlockWallet() {

		return this.wallet.openWallet({
			filename: this.name ? this.name : this.filename.value,
			password: this.password.value
		});

	}
}
