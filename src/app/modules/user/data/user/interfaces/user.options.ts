export interface UserOptions {
	loginMethod: LoginMethods;
}

export enum LoginMethods {
	PASSWORD = 1,
	SSH_PEM
}
