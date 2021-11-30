/**
 * Restore Wallet request payload
 *
 * @property filename string
 * @property restore_height string
 * @property address string
 * @property spendkey string
 * @property viewkey string
 * @property password string
 */
export interface RestoreWallet {

	/**
	 * The wallet's file name on the RPC server.
	 */
	filename: string;

	/**
	 * (Optional; defaults to 0) The block height to restore the wallet from.
	 */
	restore_height?: number;

	/**
	 * The wallet's primary address.
	 */
	address: string;

	/**
	 * (Optional; omit to create a view-only wallet) The wallet's private spend key.
	 */
	spendkey?: string;

	/**
	 * The wallet's private view key.
	 */
	viewkey: string;

	/**
	 * The wallet's password.
	 */
	password: string;

	/**
	 * (Defaults to true) If true, save the current wallet before generating the new wallet.
	 */
	autosave_current?: boolean;

}
