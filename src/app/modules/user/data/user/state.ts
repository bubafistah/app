import {UserOptions} from './interfaces/user.options';

export interface UsersState {
	users: { [id: string]: UserState };
}

export interface UserState {
	id: string;
	username: string;
	options: UserOptions;
	meta: UserMeta;
}

export interface UserMeta {
	decryptionKey: string;
}
