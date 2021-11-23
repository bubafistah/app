export interface AddAddressBook {
	address: string;
	payment_id?: string; // (optional) string, defaults to "0000000000000000000000000000000000000000000000000000000000000000";
	description?: string; // (optional) string, defaults to "";
}
