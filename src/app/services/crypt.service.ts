import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {FileSystemService} from './filesystem/file-system.service';

@Injectable({
	providedIn: 'root'
})
export class CryptService {
	constructor(
		private appService: AppService,
		private fileSystem: FileSystemService
	) {
	}

	/**
	 * Takes the string and uses l337 speak conventions
	 * to create a reproducible salt unique to the input
	 *
	 * @param input String to create a salt for
	 */
	createSalt(input: string): string {
		if (!input) {
			return '';
		}
		return input
			.replace('o', '0')
			.replace(/l/gi, '1')
			.replace(/e/gi, '3')
			.replace(/a/gi, '4')
			.replace(/s/gi, 'z')
			.replace(/t/gi, '7');
	}

	/**
	 * performs a sha256 hash but uses the input to create a reproducible salt
	 *
	 * @param input
	 * @returns
	 */
	sha256Salty(input): string {
		return this.appService.crypto
			.SHA256(input + this.createSalt(input))
			.toString();
	}

	generateKey(input) {
		const salt = this.appService.crypto.lib.WordArray.random(128 / 8);
		return this.appService.crypto.PBKDF2(input, salt, {
			keySize: 256 / 32
		});
	}

	/**
	 * Creates a armoured OpenPGP key pair with revoke cert
	 *
	 * @param username
	 * @param password
	 */
	async createOpenPGP(username, password) {
		return await this.appService.openpgp.generateKey({
			type: 'rsa', // Type of the key, defaults to ECC
			rsaBits: 4096,
			userIDs: [{name: username}], // you can pass multiple user IDs
			passphrase: password, // protects the private key
			format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
		});
	}

	/**
	 * Takes a ID and the string data, returns the string encrypted.
	 *
	 * @param id
	 * @param data
	 * @returns
	 */
	async encryptPGPSingle(id: string, data: string) {
		const encryptionKey = await this.fileSystem.readFile(
			`users/${id}.lthn.public.asc`
		);

		if (encryptionKey.length === 0) {
			throw new Error(`Failed to load encryption key id: ${id}`);
		}
		const encrypted = await this.appService.openpgp.encrypt({
			message: await this.appService.openpgp.createMessage({
				text: data
			}), // input as Message object
			encryptionKeys: await this.appService.openpgp.readKey({
				armoredKey: encryptionKey
			})
		});

		return encrypted;
	}

	async dencryptPGPSingle(id: string, passphrase: string, encrypted: string) {
		const encryptionKey = await this.fileSystem.readFile(
			`users/${id}.lthn.private.asc`
		);

		const privateKey = await this.appService.openpgp.decryptKey({
			privateKey: await this.appService.openpgp.readPrivateKey({
				armoredKey: encryptionKey
			}),
			passphrase
		});
		const message = await this.appService.openpgp.readMessage({
			armoredMessage: encrypted // parse armored message
		});
		const {data: decrypted, signatures} =
			await this.appService.openpgp.decrypt({
				message,
				decryptionKeys: privateKey
			});
		console.log(decrypted);

		return decrypted;
	}

	/**
	 * This function is for paranoia sakes, do not use for crypto graphic seeds.
	 * the only purpose of this is to adjust memory values of sensitive data
	 *
	 * @returns {string}
	 */
	randString(length: number): string {
		return ''.padEnd(length, '1');
	}
}
