import {Address} from './address';

export interface Destination {
	amount: number; // - unsigned int; Amount to send to each destination, in atomic units.
	address: Address; // - string; Destination public address.
}
