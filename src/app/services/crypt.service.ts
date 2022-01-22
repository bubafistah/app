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

	get keyMap() {
		return {
			'o': '0',
			'l': "1",
			'e': "3",
			'a': "4",
			's': "z",
			't': "7",
		}
	}
	
	/**
	 * Transforms the input string with a lite l337 conversion
	 * this will always give you the same salt, im aware of the issues here
	 * Please start a GitHub issue if you have a good idea for knowledge-less reproducible salts
	 *
	 * Maybe allow people to set a custom salter? something for later.
	 *
	 * @param {string} input
	 * @returns {string}
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
	 * lighter quasi-entropy salt, to test, when on on a markdown editor
	 * 
	 * @param {string} input
	 * @returns {string}
	 */
	createSaltV2(input: string): string {
		if (!input) {
			return '';
		}

		let i: number = input.length;
		let salt:string[] = []
		while (i--) {
			salt.push(input[i] === this.keyMap[i] ? this.keyMap[i] : input[i]);
		}

		return salt.join('');
	}

	/**
	 * sha256 hash that uses itself converted as a reproducable salt
	 *
	 * @param input
	 * @returns {string}
	 */
	sha256Salty(input): string {
		return this.appService.crypto
			.SHA256(input + this.createSalt(input))
			.toString();
	}

	/**
	 * Create a salted PBKDF2 key for encryption purposes using a random word array
	 *
	 * @param input
	 * @returns {any}
	 */
	generateKey(input) {
		const salt = this.appService.crypto.lib.WordArray.random(128 / 8);
		return this.appService.crypto.PBKDF2(input, salt, {
			keySize: 256 / 32
		});
	}


	/**
	 * Creates a Armoured OpenPGP key for the username protected with the password supplied
	 *
	 * @param username
	 * @param password
	 * @returns {Promise<any>}
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
	 * Using a Lethean user public key, encrypt the supplied data
	 *
	 * Bigger the string, longer it'll take on slow devices... please provide UI feedback even if its
	 * "quick for you" it wont be on a Pi4 under load
	 *
	 * @param {string} id cryptService.sha256Salty(username)
	 * @param {string} data
	 * @returns {Promise<any>}
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

	/**
	 * Requires the users password, for this reason, you might want to make or interact with profiles
	 * they are like sub accounts, but not, multiple personality syndrome with split brain describes it well.
	 *
	 * @param {string} id cryptService.sha256Salty(username)
	 * @param {string} passphrase
	 * @param {string} encrypted
	 * @returns {Promise<any>}
	 */
	async decryptPGPSingle(id: string, passphrase: string, encrypted: string) {
		/**
		 * @type string OpenPGP Armoured private key
		 */
		let encryptionKey = await this.fileSystem.readFile(
			`users/${id}.lthn.private.asc`
		);
		// decrypt the private key
		let privateKey = await this.appService.openpgp.decryptKey({
			privateKey: await this.appService.openpgp.readPrivateKey({
				armoredKey: encryptionKey
			}),
			passphrase
		});

		let message = await this.appService.openpgp.readMessage({
			armoredMessage: encrypted
		})

		const {data: decrypted, signatures} =
			await this.appService.openpgp.decrypt({
				message,
				decryptionKeys: privateKey
			});
		console.log(signatures)
		// Leave nothing to chance
		privateKey = null
		encryptionKey = ''
		message = null

		return decrypted;
	}

}
