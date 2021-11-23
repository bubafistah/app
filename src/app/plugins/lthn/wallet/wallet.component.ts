import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'lthn-spp-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
	constructor() {}

	ngOnInit(): void {
		console.log('WalletComponent INIT');
	}

	ngOnDestroy(): void {
		console.log('WalletComponent DESTROY');
	}
}
