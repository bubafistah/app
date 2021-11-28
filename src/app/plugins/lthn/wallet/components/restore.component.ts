import {Component, OnInit} from '@angular/core';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
	selector: 'lthn-wallet-restore',
	templateUrl: './restore.component.html'
})
export class RestoreComponent implements OnInit {
	restoreWalletForm = new FormGroup({
		filename: new FormControl(''),
		address: new FormControl(''),
		restore_height: new FormControl('0'),
		autosave_current: new FormControl(true),
		password: new FormControl(''),
		password_confirm: new FormControl(''),
		spendkey: new FormControl(''),
		viewkey: new FormControl(''),
		viewonly_wallet: new FormControl(false),
	});

	constructor(private wallet: WalletService) {
	}

	ngOnInit(): void {
	}

	restoreWallet() {
		console.log(this.restoreWalletForm.value)
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
