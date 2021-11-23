export interface TransferOut {
	fee: number; // - Integer value of the fee charged for the txn.
	tx_hash: string; // - String for the publically searchable transaction hash
	tx_key: string; // - String for the transaction key if get_tx_key is true, otherwise, blank string.
}
