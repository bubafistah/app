import {Injectable} from '@angular/core';


import {APP_CONFIG} from '@env/environment';
import {ConfigIniParser} from 'config-ini-parser';
import {FileSystemService} from '@service/filesystem/file-system.service';

@Injectable({
	providedIn: 'root'
})
/**
 * @deprecated
 */
export class AppService {

	public letheanConfig: ConfigIniParser;
	openpgp: any;
	crypto: any;

	constructor() {

			this.openpgp = require('openpgp');
			this.crypto = require('crypto-js');

	}

}
