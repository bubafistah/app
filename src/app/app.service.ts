import {Injectable} from '@angular/core';
import {ConfigIniParser} from 'config-ini-parser';

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



	}

}
