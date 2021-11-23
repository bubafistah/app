import {Action, createReducer} from '@ngrx/store';
import {ProfileState} from './state.ts';

// here you can configure initial state of your app
// for all your users
export const initialState: ProfileState = {
	// Friendly name for the profile
	alias: undefined,
	// auto generated image from the friendly name
	avatar: undefined,
	// id's to attached wallets
	wallets: undefined,
	// application prefrences etc
	options: undefined,
	// Decryption Key, used to store profile data encrypted within a shared local database
	dkey: undefined,
	// Encryption Key, to save data
	ekey: undefined
};

const profileReducer = createReducer(initialState);

export function reducer(state: ProfileState, action: Action) {
	return profileReducer(state, action);
}
