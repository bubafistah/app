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
	fs: any;
	path: any;
	public letheanConfig: ConfigIniParser;
	openpgp: any;
	crypto: any;
	letheanPaths: any;

	constructor(private fileSystem: FileSystemService) {
		// Conditional imports
		if (window.require !== undefined) {
			// Notes :
			// * A NodeJS's dependency imported with 'window.require' MUST BE present in `dependencies` of both `app/package.json`
			// and `package.json (root folder)` in order to make it work here in Electron's Renderer process (src folder)
			// because it will loaded at runtime by Electron.
			// * A NodeJS's dependency imported with TS module import (ex: import { Dropbox } from 'dropbox') CAN only be present
			// in `dependencies` of `package.json (root folder)` because it is loaded during build phase and does not need to be
			// in the final bundle. Reminder : only if not used in Electron's Main process (app folder)

			// If you want to use a NodeJS 3rd party deps in Renderer process (like @electron/remote),
			// it must be declared in dependencies of both package.json (in root and app folders)
			// If you want to use remote object in renderer process, please set enableRemoteModule to true in main.ts

			if (!this.isFirstRun) {
				this.loadConfig();
			}
		} else {
			this.openpgp = require('openpgp');
			this.crypto = require('crypto-js');
		}
	}

	/**
	 * returns true if this is the application first run
	 */
	get isFirstRun(): boolean {
		try {
			return this.fileSystem.exists('conf/app.ini') === false;
		} catch (e) {
			return true;
		}
	}

	/**
	 * Returns true if code is run in the installed Application
	 *
	 * @returns
	 */
	get isApp(): boolean {
		return (
			navigator.userAgent.toLowerCase().indexOf(' electron/') > -1 ||
			APP_CONFIG.environment === 'LOCAL' ||
			APP_CONFIG.environment === 'DEV'
		);
	}

	loadConfig() {
		try {
			const confFile = this.fileSystem.readFile('conf/app.ini');

			this.letheanConfig = new ConfigIniParser('\r\n');
			this.letheanConfig.parse(confFile.toString());
		} catch (e) {
			if (e === ConfigIniParser.Errors.ErrorDuplicateSectionError) {
				console.error('Duplicated section');
			}
			console.error(e);
		}
	}
}
