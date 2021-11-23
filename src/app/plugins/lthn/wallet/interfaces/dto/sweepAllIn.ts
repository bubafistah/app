export interface SweepAllIn {
	address: string; // Destination public address.
	priority?: number; // (Optional)
	mixin: number; //  Number of outpouts from the blockchain to mix with (0 means no mixing).
	unlock_time: number; // unsigned int; Number of blocks before the monero can be spent (0 to not add a lock).
	payment_id?: string; // (Optional) Random 32-byte/64-character hex string to identify a transaction.
	get_tx_keys?: boolean; // (Optional) Return the transaction keys after sending.
	below_amount?: number; // (Optional)
	do_not_relay?: boolean; // (Optional)
	get_tx_hex: boolean; // (Optional) return the transactions as hex encoded string.
}
