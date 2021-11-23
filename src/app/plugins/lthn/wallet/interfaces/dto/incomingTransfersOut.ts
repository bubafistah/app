export interface IncomingTransfersOut {
	amount: number; // - unsigned int
	spent: boolean; // - boolean
	global_index: number; // - unsigned int; Mostly internal use, can be ignored by most users.
	tx_hash: string; // - string; Several incoming transfers may share the same hash if they were in the same transaction.
	tx_size: number; // - unsigned int
}
