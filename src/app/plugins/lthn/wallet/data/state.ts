import {PaginatorOptions} from '@data/interface/pagination';
import {GetTransfersOut, Transfer} from '@plugin/lthn/wallet/interfaces';

export interface WalletsState {
	loaded_wallet: string;
	known_wallets: string[];
	wallets: { [key: string]: Wallet; }

}

export class WalletState implements WalletsState{
	loaded_wallet = ''
	known_wallets = []
	wallets = {}
}

export interface Wallet {
	/**
	 * Wallet height
	 */
	height: number;
	name: string;
	transfers: GetTransfersOut[];
	options: {
		inactivityThreshold: number;
		pollingInterval: number;
		pagination: PaginatorOptions
	}
	error: string | undefined
}

export class Wallet implements Wallet {
	options = {
		inactivityThreshold: 10,
		pollingInterval: 10000,
		pagination: new PaginatorOptions
	}

	constructor(name: string) {
		this.name = name
	}

}
