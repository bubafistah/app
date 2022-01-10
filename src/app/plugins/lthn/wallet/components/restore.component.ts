import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {nameNotTakenValidator} from '../validators';

@Component({
	selector: 'lthn-wallet-restore',
	templateUrl: './restore.component.html'
})

export class RestoreComponent implements OnInit {
	restoreWalletForm : FormGroup;

	constructor(private wallet: WalletService) {
	}

	ngOnInit(): void {
		this.restoreWalletForm = new FormGroup({
			filename: new FormControl('', [nameNotTakenValidator(this.wallet.walletList())]),
			address: new FormControl(''),
			restore_height: new FormControl('0'),
			autosave_current: new FormControl(true),
			password: new FormControl(''),
			password_confirm: new FormControl(''),
			spendkey: new FormControl(''),
			viewkey: new FormControl(''),
			viewonly_wallet: new FormControl(false),
		});
	}

	restoreWallet() {

		this.wallet.restoreWallet({
			filename: this.restoreWalletForm.value.filename,
			address: this.restoreWalletForm.value.address,
			restore_height: this.restoreWalletForm.value.restore_height,
			autosave_current: this.restoreWalletForm.value.autosave_current,
			password: this.restoreWalletForm.value.password,
			spendkey:
			(
				this.restoreWalletForm.value.viewonly_wallet ?
					'' : this.restoreWalletForm.value.spendkey
			)
			,
			viewkey: this.restoreWalletForm.value.viewkey
		});
	}
}
