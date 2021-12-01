import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { WalletRpcService } from '@service/wallet.rpc.service';

import { nameNotTakenValidator } from '../validators'
import { WalletService } from '../wallet.service'

@Component({
	selector: 'lthn-wallet-new',
	templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
	wallet_name = new FormControl('', [nameNotTakenValidator(this.wallet.walletList())]);
	password = new FormControl('');
	password_confirm = new FormControl('');
	constructor(private walletRpc: WalletRpcService, private wallet: WalletService) {}

	ngOnInit(): void {}

	createWallet() {
		if (this.password.value === this.password_confirm.value) {
			console.log(
				this.walletRpc.createWallet({
					filename: this.wallet_name.value,
					password: this.password.value,
					language: 'English'
				})
			);
		}
	}
}
