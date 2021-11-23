import {Address} from '../types/address';

export interface SplitIntegratedAddressOut {
	standard_address: Address;
	payment_id: string;
}
