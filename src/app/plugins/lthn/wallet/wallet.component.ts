import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {ModalConfig} from '@service/ui/modal/modalConfig';
import {ModalComponent} from '@service/ui/modal/modal.component';
import {Balance} from '@plugin/lthn/wallet/interfaces';
import {Observable} from 'rxjs';

@Component({
	selector: 'lthn-spp-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
	public balance:  Balance | Promise<Balance>;
	constructor(private wallet: WalletService) {}
	public wallets: string[] = [];
	public modalConfig: ModalConfig = {modalTitle: 'Open Wallet'} as ModalConfig;
	@ViewChild('modal') private modalComponent: ModalComponent
	public openedWallet: string;
	public showtx: boolean = false;
	async openModal() {
		return await this.modalComponent.open()
	}
	 async ngOnInit() {
		 await this.getBalance()
		 this.wallets = this.wallet.walletList()

	 }

	ngOnDestroy(): void {
		console.log('WalletComponent DESTROY');
	}

	openWallet(key: string){
		this.openedWallet = key;
		this.openModal()

	}

	async getBalance() {
		this.balance = await this.wallet.getBalance().then((data) => data)
	}
}
