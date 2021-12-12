import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {rpcBody} from '@service/json-rpc';
import {ChainSetGetInfo} from '@plugin/lthn/chain/data';
import {Store} from '@ngrx/store';

@Injectable({
	providedIn: 'root'
})
export class BlockchainService {
	constructor(private http: HttpClient, private store: Store) {}

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

	chainRpc(method: string, params: any) {
		return this.http
			.post<any>('https://localhost:36911/daemon/chain/json_rpc', JSON.stringify(rpcBody(method)(params)));
	}

	getInfo(){
		this.chainRpc('get_info', '').subscribe((data) => {
			this.store.dispatch(ChainSetGetInfo({info: data.result}))
		})
	}
}
