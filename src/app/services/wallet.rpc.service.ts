import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {request} from '@service/json-rpc';
import {Observable} from 'rxjs';
import {AddAddressBook, Address, Balance, CreateWallet, GetAddressBookOut, GetBulkPaymentsIn,
	GetBulkPaymentsOut, GetPaymentsIn, GetPaymentsOut, GetTransfersIn, GetTransfersOut, Height, IncomingTransfersIn,
	IncomingTransfersOut, IntegratedAddress, MakeIntegratedAddressIn, MakeUriIn, OpenWallet, QueryKeyIn, QueryKeyOut,
	SplitIntegratedAddressOut, StoreOut, SweepAllIn, SweepAllOut, Transfer, TransferIn, TransferOut, TransferSplitIn,
	TransferSplitOut, Uri} from '@plugin/lthn/wallet/interfaces';
import {RestoreWallet} from '@plugin/lthn/wallet/interfaces/wallet';

const axios = require('axios').default;

@Injectable({
	providedIn: 'root'
})
export class WalletRpcService {
	private url = 'https://localhost:36911/daemon/wallet/json_rpc';

	constructor(private http: HttpClient) {
	}

	/**
	 * Send Wallet Service start POST req
	 *
	 * @returns {Promise<void>}
	 */
	startWallet() {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			responseType: 'text' as 'json'
		};

		const request = {rpcBindPort: '36963', disableRpcLogin: false};

		return this.http
			.post<any>(
				`https://localhost:36911/daemon/wallet/rpc`,
				request,
				options
			)
			.toPromise()
			.then((dat) => console.log(dat));
	}

	/**
	 * Get openned wallet balance
	 *
	 * @returns {Observable<Balance>}
	 */
	getBalance(): Observable<Balance> {
		return request(this.url)('getbalance');
	}

	/**
	 * Get the address of the opened wallet
	 *
	 * @returns {Observable<Address>}
	 */
	getAddress(): Observable<Address> {
		return request(this.url)('getaddress');
	}

	/**
	 * Get chain height
	 *
	 * @returns {Observable<Height>}
	 */
	getHeight(): Observable<Height> {
		return request(this.url)('getheight');
	}

	/**
	 * Send a transaction
	 *
	 * @param {TransferIn} x
	 * @returns {Observable<TransferOut>}
	 */
	transfer(x: TransferIn): Observable<TransferOut> {
		return request(this.url)('transfer', x);
	}

	/**
	 *
	 * @param {TransferSplitIn} x
	 * @returns {Observable<TransferSplitOut>}
	 */
	transferSplit(x: TransferSplitIn): Observable<TransferSplitOut> {
		return request(this.url)('transfer_split', x);
	}

	/**
	 *
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	sweepDust() {
		return request(this.url)('sweep_dust');
	}

	/**
	 * Send all funds
	 * @param {SweepAllIn} x
	 * @returns {Observable<SweepAllOut>}
	 */
	sweepAll(x: SweepAllIn): Observable<SweepAllOut> {
		return request(this.url)('sweep_all');
	}

	/**
	 *
	 * @returns {Observable<StoreOut>}
	 */
	store(): Observable<StoreOut> {
		return request(this.url)('store');
	}

	/**
	 *
	 * @param {GetPaymentsIn} x
	 * @returns {Observable<GetPaymentsOut>}
	 */
	getPayments(x: GetPaymentsIn): Observable<GetPaymentsOut> {
		return request(this.url)('get_payments', x);
	}

	/**
	 *
	 * @param {GetBulkPaymentsIn} x
	 * @returns {Observable<GetBulkPaymentsOut>}
	 */
	getBulkPayments(x: GetBulkPaymentsIn): Observable<GetBulkPaymentsOut> {
		return request(this.url)('get_bulk_payments', x);
	}

	/**
	 *
	 * @param {GetTransfersIn} x
	 * @returns {Observable<GetTransfersOut>}
	 */
	getTransfers(x: GetTransfersIn): Observable<GetTransfersOut> {
		return request(this.url)('get_transfers', x);
	}

	/**
	 * Get transfer by Transactin ID
	 *
	 * @param {{txid: string}} x
	 * @returns {Observable<Transfer>}
	 */
	getTransferByTxid(x: { txid: string }): Observable<Transfer> {
		return request(this.url)('get_transfer_by_txid', x);
	}

	/**
	 *
	 * @param {IncomingTransfersIn} x
	 * @returns {Observable<IncomingTransfersOut>}
	 */
	incomingTransfers(
		x: IncomingTransfersIn
	): Observable<IncomingTransfersOut> {
		return request(this.url)('incoming_transfers', x);
	}

	/**
	 *
	 * @param {QueryKeyIn} x
	 * @returns {Observable<QueryKeyOut>}
	 */
	queryKey(x: QueryKeyIn): Observable<QueryKeyOut> {
		return request(this.url)('query_key', x);
	}

	/**
	 *
	 * @param {MakeIntegratedAddressIn} x
	 * @returns {Observable<IntegratedAddress>}
	 */
	makeIntegratedAddress(
		x: MakeIntegratedAddressIn
	): Observable<IntegratedAddress> {
		return request(this.url)('make_integrated_address', x);
	}

	/**
	 *
	 * @param {IntegratedAddress} x
	 * @returns {Observable<SplitIntegratedAddressOut>}
	 */
	splitIntegratedAddress(
		x: IntegratedAddress
	): Observable<SplitIntegratedAddressOut> {
		return request(this.url)('split_integrated_address', x);
	}

	/**
	 *
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	stopWallet() {
		return request(this.url)('stop_wallet');
	}

	/**
	 *
	 * @param {MakeUriIn} x
	 * @returns {Observable<Uri>}
	 */
	makeUri(x: MakeUriIn): Observable<Uri> {
		return request(this.url)('make_uri', x);
	}

	/**
	 *
	 * @param {Uri} x
	 * @returns {Observable<MakeUriIn>}
	 */
	parseUri(x: Uri): Observable<MakeUriIn> {
		return request(this.url)('parse_uri', x);
	}

	/**
	 *
	 * @param {{entries: number[]}} x
	 * @returns {Observable<GetAddressBookOut>}
	 */
	getAddressBook(x: { entries: number[] }): Observable<GetAddressBookOut> {
		return request(this.url)('get_address_book', x);
	}

	/**
	 *
	 * @param {AddAddressBook} x
	 * @returns {Observable<{index: number}>}
	 */
	addAddressBook(x: AddAddressBook): Observable<{ index: number }> {
		return request(this.url)('add_address_book', x);
	}

	/**
	 *
	 * @param {{index: number}} x
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	deleteAddressBook(x: { index: number }) {
		return request(this.url)('delete_address_book', x);
	}

	/**
	 *
	 * @param {OpenWallet} x
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	openWallet(x: OpenWallet) {
		return request(this.url)('open_wallet', x);
	}

	/**
	 *
	 * @param {CreateWallet} x
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	createWallet(x: CreateWallet) {
		return request(this.url)('create_wallet', x);
	}

	/**
	 *
	 * @param {RestoreWallet} x
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	restoreWallet(x: RestoreWallet) {
		return request(this.url)('generate_from_keys', x);
	}

	/**
	 *
	 * @param {string} method
	 * @param arg
	 * @returns {Observable<any>}
	 */
	other(method: string, arg?: any): Observable<any> {
		return request(this.url)(method, arg);
	}
}
