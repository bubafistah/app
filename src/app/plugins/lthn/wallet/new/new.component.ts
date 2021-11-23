import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { WalletService } from '../wallet.service';

@Component({
	selector: 'lthn-app-new',
	templateUrl: './new.component.html',
	styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
	wallet_name = new FormControl('');
	password = new FormControl('');
	password_confirm = new FormControl('');
	constructor(private wallet: WalletService) {}

	ngOnInit(): void {}

	createWallet() {
		if (this.password.value === this.password_confirm.value) {
			console.log(
				this.wallet.createWallet({
					filename: this.wallet_name.value,
					password: this.password.value,
					language: 'English'
				})
			);
		}
	}
}
