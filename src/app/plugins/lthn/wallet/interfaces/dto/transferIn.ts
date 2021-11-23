import {Destination} from '../types/destination';

export interface TransferIn {
	destinations: Destination[];
	fee?: number; // - unsigned int; Ignored, will be automatically calculated.
	mixin: number; // - unsigned int; Number of outpouts from the blockchain to mix with (0 means no mixing).
	unlock_time: number; // - unsigned int; Number of blocks before the monero can be spent (0 to not add a lock).
	payment_id?: string; // - string; (Optional) Random 32-byte/64-character hex string to identify a transaction.
	get_tx_key?: boolean; // - boolean; (Optional) Return the transaction key after sending. Outputs:
}
