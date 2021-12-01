import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ConfigIniParser} from 'config-ini-parser';
import {CryptService} from '@service/crypt.service';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

export interface Task {
	name: string;
	completed: boolean;
	status: string;
}

@Component({
	selector: 'lthn-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent {
	task: Task = {
		name: 'Sync Blockchain',
		completed: false,
		status: 'on'
	};

	userForm = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
		passwordRepeat: new FormControl('')
	});

	username = new FormControl('');
	password = new FormControl('');
	passwordRepeat = new FormControl('');
	processingForm = false;

	constructor(
		private cryptService: CryptService,
		private fileSystem: FileSystemService,
		private router: Router,
		private authService: AuthService
	) {
	}

	async addUser() {
		this.processingForm = true;
		const username = this.username.value;
		const password = this.password.value;
		const passwordRepeat = this.passwordRepeat.value;

		const p = new ConfigIniParser('\r\n');
		try {
			p.addSection('daemon');
			p.set('daemon', 'start_on_boot', 'on');

			await this.fileSystem.writeFile(
				'conf/app.ini',
				p.stringify('\r\n')
			);
		} catch (e) {
			if (e === ConfigIniParser.Errors.ErrorDuplicateSectionError) {
				console.error('Duplicated section');
			}
		}

		const usernameHash = this.cryptService.sha256Salty(username);

		if (password === passwordRepeat) {
			console.log('Creating OpenPGP Keys.');
			const {privateKey, publicKey, revocationCertificate} =
				await this.cryptService.createOpenPGP(usernameHash, password);
			console.log('Keys created');

			console.log('Saving keys to local filesystem');
			await this.fileSystem.writeFile(
				`users/${usernameHash}.lthn.private.asc`,
				privateKey
			);
			await this.fileSystem.writeFile(
				`users/${usernameHash}.lthn.public.asc`,
				publicKey
			);
			await this.fileSystem.writeFile(
				`users/${usernameHash}.lthn.revoke.asc`,
				revocationCertificate
			);

			console.log('Creating User profile data file');
			await this.fileSystem.writeFile(
				`users/${usernameHash}.lthn`,
				await this.cryptService.encryptPGPSingle(
					usernameHash,
					JSON.stringify({
						username: username,
						id: usernameHash,
						key: this.cryptService.generateKey(
							username +
							this.cryptService
								.createSalt(username)
								.toString()
						)
					})
				)
			);
			await this.authService.login(username, password);
			console.log('cleaning up');
			console.log('Done, and away we go!');
			await this.router.navigateByUrl(`/`);
		}
	}
}
