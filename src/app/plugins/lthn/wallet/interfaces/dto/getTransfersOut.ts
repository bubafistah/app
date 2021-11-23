import {Transfer} from '../types/transfer';
import {Destination} from '../types/destination';

export interface GetTransfersOut {
	in?: Transfer[] & Destination[]; // - boolean;
	out?: Transfer[]; // - boolean;
	pending?: Transfer[]; // - boolean;
	failed?: Transfer[]; // - boolean;
	pool?: Transfer[]; // - boolean;
}
