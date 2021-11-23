export interface Payment {
	amount: number;
	block_height: number;
	payment_id: string;
	tx_hash: string;
	unlock_time: number;
}
