/**
 * SweepAll request payload
 *
 * @property address string
 * @property priority number
 * @property mixin string
 * @property unlock_time number
 * @property payment_id string
 * @property get_tx_keys boolean
 * @property below_amount number
 * @property do_not_relay boolean
 * @property get_tx_hex boolean
 */
export interface SweepAllIn {

	/** Destination public address */
	address: string;

	/** (Optional) */
	priority?: number;

	/** Number of outpouts from the blockchain to mix with (0 means no mixing). */
	mixin: number;

	/** unsigned int; Number of blocks before the monero can be spent (0 to not add a lock). */
	unlock_time: number;

	/** (Optional) Random 32-byte/64-character hex string to identify a transaction. */
	payment_id?: string;

	/** (Optional) Return the transaction keys after sending. */
	get_tx_keys?: boolean;

	/** (Optional) */
	below_amount?: number;

	/** (Optional)  */
	do_not_relay?: boolean;

	/** (Optional) return the transactions as hex encoded string. */
	get_tx_hex?: boolean;
}
