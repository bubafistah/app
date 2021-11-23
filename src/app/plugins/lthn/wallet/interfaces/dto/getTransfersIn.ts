export interface GetTransfersIn {
	in?: boolean; // - boolean;
	out?: boolean; // - boolean;
	pending?: boolean; // - boolean;
	failed?: boolean; // - boolean;
	pool?: boolean; // - boolean;
	filter_by_height?: boolean; // - boolean;
	min_height?: number; // - unsigned int;
	max_height?: number; // - unsigned int;
}
