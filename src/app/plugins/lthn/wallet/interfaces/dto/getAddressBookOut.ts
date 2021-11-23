export interface GetAddressBookOut {
	entries: {
		address: string;
		description: string;
		index: number;
		payment_id: string;
	};
}
