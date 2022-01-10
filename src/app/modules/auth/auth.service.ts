import {Injectable} from '@angular/core';
import {CryptService} from '@service/crypt.service';
import {FileSystemService} from '@service/filesystem/file-system.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user = '';
	private id = '';

	constructor(
		private cryptService: CryptService,
		private fileSystem: FileSystemService
	) {
	}

	/**
	 * User auth check is (this.user.length > 0) we only need to store how to access the data.
	 *
	 * Please do not add identifiable data or anything here, data like that should live in the users encrypted
	 * json profiles.
	 *
	 * If extra data is required here, it should be kept to a min, not expose, not persist and only be for user benefit
	 * not because it would just be easier to code
	 *
	 * @returns {boolean}
	 */
	getAuthStatus() {
		return this.user.length > 0;
	}

	/**
	 * Takes a username and password and tries to decrypt data files with a name id matching
	 *
	 * It either works and that was the right password, or it does not and then it wont.
	 *
	 * We are using OpenPGP so adding a backup key that can decrypt the current password, that we update using the public key.
	 * so if the worst happens, they can decrypt using a HSM/encrypted file stored passwordless private key
	 *
	 * @param username
	 * @param password
	 * @returns {Promise<void>}
	 */
	async login(username, password) {
		const id = this.cryptService.sha256Salty(username);
		const data = await this.fileSystem.readFile(`users/${id}.lthn`);

		const decrypted = JSON.parse(
			await this.cryptService.decryptPGPSingle(id, password, data)
		);
		this.user = decrypted.username;
		this.id = decrypted.id;
	}

	/**
	 * Clear the user prop by setting to a empty string, making auth checks fail.
	 */
	logout() {
		this.user = '';
	}

	getId(){
		return this.id;
	}

	getUser(){
		return this.user;
	}
}
