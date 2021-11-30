import {Injectable} from '@angular/core';
import {FileSystemWebService} from './file-system-web.service';

@Injectable({
	providedIn: 'root'
})
export class FileSystemService {
	public type: string;

	constructor(private appFilesystem: FileSystemWebService) {
	}

	/**
	 * returns a working FS wrapper
	 * @todo add WebFileSystem API wrapper
	 */
	get fileSystem() {
		return this.appFilesystem;
	}

	/**
	 * List files in the directory
	 *
	 * @param dirname
	 * @returns
	 */
	async listFiles(dirname) {
		try {
			return await this.fileSystem.list(dirname);
		} catch (e) {
			return []
		}

	}

	/**
	 * Returns the string value of a file
	 *
	 * @param filename Including system path
	 */
	async readFile(filename: string) {
		return await this.fileSystem.read(filename);
	}

	/**
	 * write a file to the filesystem
	 *
	 * @param filename
	 * @param data
	 */
	writeFile(filename: string, data: any) {
		return this.fileSystem.write(filename, data);
	}

	/**
	 * Create a directory on the filesystem
	 *
	 * @param dirname
	 * @returns
	 */
	mkDir(dirname: string) {
		return this.fileSystem.mkdir(dirname);
	}

	/**
	 * check if a file or directory exists
	 *
	 * @param pathname
	 * @returns
	 */
	exists(pathname: string) {
		return this.fileSystem.exists(pathname);
	}
}
