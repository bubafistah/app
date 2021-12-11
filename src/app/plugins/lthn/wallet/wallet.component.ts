import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {ModalConfig} from '@service/ui/modal/modalConfig';
import {ModalComponent} from '@service/ui/modal/modal.component';
import {Balance} from '@plugin/lthn/wallet/interfaces';
import {PluginDefinition, PluginStatus} from '@data/plugins';

@Component({
	selector: 'lthn-app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
	public pluginConfig: PluginDefinition = {
		description_short: 'test',
		git_repo: 'https://github.com/Snider/plugin-bootstrap.git',
		name: 'test',
		readme_list: 'https://github.com/Snider/plugin-bootstrap#readme',
		status: PluginStatus.ACTIVE
	}
	public balance:  Balance | Promise<Balance>;
	constructor(private wallet: WalletService) {}
	public wallets: string[] = [];
	public modalConfig: ModalConfig = {modalTitle: 'Open Wallet'} as ModalConfig;
	@ViewChild('modal') private modalComponent: ModalComponent
	public openedWallet: string = '';
	public showtx: boolean = false;
	public txnSelection: any = {
		in: true,
		out: true,
		pending: true,
		failed: true,
		pool: true,
		filter_by_height: false,
		min_height: null,
		max_height: null
	};
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

	public async toggle(col) {
		await this.wallet.loadTransfers(this.txnSelection);
		this.txnSelection[col] = !!this.txnSelection[col]
	}

	public isChecked(col) {
		return this.txnSelection[col]
	}
}
