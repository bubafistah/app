/**
 * Get wallet transfers request payload
 *
 * @property in boolean
 * @property out boolean
 * @property pending boolean
 * @property failed boolean
 * @property pool boolean
 * @property filter_by_height boolean
 * @property min_height number
 * @property max_height number
 */
export interface GetTransfersIn {
	/** transfers IN */
	in?: boolean;
	/** transfers OUT */
	out?: boolean;
	/** transfers PENDING */
	pending?: boolean;
	/** transfers FAILED */
	failed?: boolean;
	/** transfers POOL */
	pool?: boolean;
	/** Filter TX's */
	filter_by_height?: boolean;
	/** min height */
	min_height?: number;
	/** max height */
	max_height?: number;
}
