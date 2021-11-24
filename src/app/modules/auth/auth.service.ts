import {Injectable} from '@angular/core';
import {CryptService} from '@service/crypt.service';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {APP_CONFIG} from '@env/environment';

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

	getAuthStatus() {
		if (!APP_CONFIG.production) {
			return true;
		}
		return this.user.length > 0;
	}

	async login(username, password) {
		const id = this.cryptService.sha256Salty(username);
		const data = await this.fileSystem.readFile(`users/${id}.lthn`);

		const decrypted = JSON.parse(
			await this.cryptService.dencryptPGPSingle(id, password, data)
		);
		this.user = decrypted.username;
		this.id = decrypted.id;
	}

	logout() {
		this.user = '';
	}
}
