/**
 * @param address Destination public address
 * @param priority (Optional)
 * @param mixin Number of outpouts from the blockchain to mix with (0 means no mixing).
 * @param unlock_time  unsigned int; Number of blocks before the monero can be spent (0 to not add a lock).
 * @param payment_id (Optional) Random 32-byte/64-character hex string to identify a transaction.
 * @param get_tx_keys (Optional) Return the transaction keys after sending.
 * @param below_amount (Optional)
 * @param do_not_relay (Optional)
 * @param get_tx_hex (Optional) return the transactions as hex encoded string.
 */
export interface SweepAllIn {
	address: string;
	priority?: number;
	mixin: number;
	unlock_time: number;
	payment_id?: string;
	get_tx_keys?: boolean;
	below_amount?: number;
	do_not_relay?: boolean;
	get_tx_hex: boolean;
}
