/**
 *
 * @param filename The wallet's file name on the RPC server.
 * @param restore_height (Optional; defaults to 0) The block height to restore the wallet from.
 * @param address  The wallet's primary address.
 * @param spendkey (Optional; omit to create a view-only wallet) The wallet's private spend key.
 * @param viewkey The wallet's private view key.
 * @param password The wallet's password.
 * @param autosave_current (Defaults to true) If true, save the current wallet before generating the new wallet.
 */
export interface RestoreWallet {
	restore_height?: number;
	filename: string;
	address: string;
	spendkey?: string;
	viewkey: string;
	password: string;
	autosave_current?: boolean;

}
