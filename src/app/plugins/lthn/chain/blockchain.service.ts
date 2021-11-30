import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BlockchainService {
	constructor(private http: HttpClient) {}

	startDaemon() {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			responseType: 'text' as 'json'
		};
		return this.http
			.post<any>(
				`https://localhost:36911/daemon/chain/start`,
				{},
				options
			)
			.toPromise()
			.then((dat) => console.log(dat));
	}

	/**
	 * Export chain to a raw format
	 *
	 */
	exportChain() {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			responseType: 'text' as 'json'
		};
		return this.http
			.post<any>(
				`https://localhost:36911/daemon/chain/export`,
				{},
				options
			)
			.toPromise()
			.then((dat) => console.log(dat));
	}

	/**
	 * Import raw chain data file
	 *
	 */
	importChain() {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			responseType: 'text' as 'json'
		};
		return this.http
			.post<any>(
				`https://localhost:36911/daemon/chain/import`,
				{},
				options
			)
			.toPromise()
			.then((dat) => console.log(dat));
	}

	/**
	 * Download Lethean binaries to the users home dir
	 * ~/Lethean/cli
	 *
	 * @returns {Promise<void>}
	 */
	downloadCLI() {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			responseType: 'text' as 'json'
		};
		return this.http
			.post<any>(`https://localhost:36911/update/cli`, {}, options)
			.toPromise()
			.then((dat) => dat);
	}
}
