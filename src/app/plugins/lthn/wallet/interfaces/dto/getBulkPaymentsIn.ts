export interface GetBulkPaymentsIn {
	payment_ids: string[]; // - array of: string
	min_block_height: number; // - unsigned int; The block height at which to start looking for payments.
}
