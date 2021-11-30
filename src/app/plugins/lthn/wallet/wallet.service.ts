import {Injectable} from '@angular/core';
import {WalletRpcService} from '@service/wallet.rpc.service';
import {Balance, OpenWallet, RestoreWallet} from '@plugin/lthn/wallet/interfaces';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
/**
 * Orchestrates dealing with wallets, to add a new wallet type, implement this class
 */
export class WalletService {
	private wallets: string[] = [];

	constructor(private fs: FileSystemService, private rpc: WalletRpcService) {
	}

	/**
	 * Start wallet service
	 *
	 * @returns {Promise<void>}
	 */
	startWallet() {
		return this.rpc.startWallet();
	}

	/**
	 * Restore wallet
	 *
	 * @param {RestoreWallet} req
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	restoreWallet(req: RestoreWallet) {
		return this.rpc.restoreWallet(req);
	}

	/**
	 * Open a known wallet
	 *
	 * @param {OpenWallet} req
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	openWallet(req: OpenWallet) {
		return this.rpc.openWallet(req);
	}

	/**
	 * Get wallet balance
	 *
	 * @param {Balance} req
	 * @returns {Promise<Balance>}
	 */
	getBalance(): Promise<Balance> {
		return this.rpc.getBalance()
	}
	/**
	 * Gets the list of known wallets from the file system
	 */
	getWalletList() {
		this.fs.listFiles('/wallets').then((data) => {
			if (data.length > 0) {
				for (let dat of data) {
					if (!dat.endsWith('.keys') && !dat.endsWith('.txt')) {
						this.wallets.push(dat);
					}
				}
			}
		});
	}

	/**
	 * Returns the wallets we know about
	 *
	 * @returns {string[]}
	 */
	walletList() {
		if (this.wallets.length === 0) {
			this.getWalletList();
		}
		return this.wallets;
	}
}
