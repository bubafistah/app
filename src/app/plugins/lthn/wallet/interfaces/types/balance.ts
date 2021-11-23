export interface Balance {
	balance: number; // - unsigned int; The total balance of the current monero-wallet-rpc in session.
	unlocked_balance: number; // - unsigned int; Unlocked funds are those funds that are sufficiently deep enough in the Monero blockchain to be considered safe to spend.
}
