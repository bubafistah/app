export interface ProfileState {
	// Friendly name for the profile
	alias: string;
	// auto generated image from the friendly name
	avatar: string;
	// id's to attached wallets
	wallets: any;
	// application prefrences etc
	options: any;
	// Decryption Key, used to store profile data encrypted within a shared local database
	dkey: string;
	// Encryption Key, to save data
	ekey: string;
}
