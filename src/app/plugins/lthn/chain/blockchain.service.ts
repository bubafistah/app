import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {rpcBody} from '@service/json-rpc';
import {ChainSetBlocks, ChainSetGetInfo, ChainSetTransactions} from '@plugin/lthn/chain/data';
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

	getTransactions(txsHashes: string[], decodeAsJson: boolean = true){

		this.chainRpc('get_transaction', { txs_hashes: txsHashes, decode_as_json: decodeAsJson }).subscribe((data) => {
			if (decodeAsJson && data.hasOwnProperty("txs_as_json")) {
				data.txs_as_json = JSON.parse(data.txs_as_json);
			}
			this.store.dispatch(ChainSetTransactions({transactions: data.result}))
		})
	}

	getBlocks(start_height: number, end_height: number){

		this.chainRpc('getblockheadersrange', {start_height:start_height,end_height:end_height}).subscribe((data) => {

			this.store.dispatch(ChainSetBlocks({blocks: data.result}))
		})
	}
}
