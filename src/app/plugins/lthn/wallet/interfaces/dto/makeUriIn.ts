import {Address} from '../types/address';

export interface MakeUriIn {
	address: Address;
	amount?: number; // (optional) - the integer amount to receive, in atomic units
	payment_id?: string; // (optional) - 16 or 64 character hexadecimal payment id string
	recipient_name?: string; // (optional) - string name of the payment recipient
	tx_description: string; // (optional) - string describing the reason for the tx
}
