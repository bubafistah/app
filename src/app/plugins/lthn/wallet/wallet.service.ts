import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {request} from '../../../services/json-rpc';
import {Observable} from 'rxjs';
import {CreateWallet, OpenWallet, TransferSplitIn} from './interfaces/wallet';
import {Address} from './interfaces/types/address';
import {Balance} from './interfaces/types/balance';
import {Height} from './interfaces/types/height';
import {Transfer} from './interfaces/types/transfer';
import {IntegratedAddress} from './interfaces/types/integratedAddress';
import {Uri} from './interfaces/types/uri';
import {AddAddressBook} from './interfaces/types/addAddressBook';
import {TransferIn} from './interfaces/dto/transferIn';
import {TransferOut} from './interfaces/dto/transferOut';
import {TransferSplitOut} from './interfaces/dto/transferSplitOut';
import {StoreOut} from './interfaces/dto/storeOut';
import {GetPaymentsIn} from './interfaces/dto/getPaymentsIn';
import {GetBulkPaymentsIn} from './interfaces/dto/getBulkPaymentsIn';
import {GetTransfersIn} from './interfaces/dto/getTransfersIn';
import {GetPaymentsOut} from './interfaces/dto/getPaymentsOut';
import {GetTransfersOut} from './interfaces/dto/getTransfersOut';
import {IncomingTransfersOut} from './interfaces/dto/incomingTransfersOut';
import {QueryKeyIn} from './interfaces/dto/queryKeyIn';
import {QueryKeyOut} from './interfaces/dto/queryKeyOut';
import {IncomingTransfersIn} from './interfaces/dto/incomingTransfersIn';
import {GetBulkPaymentsOut} from './interfaces/dto/getBulkPaymentsOut';
import {MakeIntegratedAddressIn} from './interfaces/dto/makeIntegratedAddressIn';
import {SplitIntegratedAddressOut} from './interfaces/dto/splitIntegratedAddressOut';
import {MakeUriIn} from './interfaces/dto/makeUriIn';
import {SweepAllIn} from './interfaces/dto/sweepAllIn';
import {GetAddressBookOut} from './interfaces/dto/getAddressBookOut';
import {SweepAllOut} from './interfaces/dto/sweepAllOut';


const axios = require('axios').default;

@Injectable({
	providedIn: 'root'
})
export class WalletService {
	private url = 'http://localhost:36910/json_rpc';

	constructor(private http: HttpClient) {
	}

	startWallet() {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			responseType: 'text' as 'json'
		};

		const request = {rpcBindPort: '36910', disableRpcLogin: true};

		return this.http
			.post<any>(
				`https://localhost:36911/daemon/wallet/rpc`,
				request,
				options
			)
			.toPromise()
			.then((dat) => console.log(dat));
	}

	getBalance(): Observable<Balance> {
		return request(this.url)('getbalance');
	}

	getAddress(): Observable<Address> {
		return request(this.url)('getaddress');
	}

	getHeight(): Observable<Height> {
		return request(this.url)('getheight');
	}

	transfer(x: TransferIn): Observable<TransferOut> {
		return request(this.url)('transfer', x);
	}

	transferSplit(x: TransferSplitIn): Observable<TransferSplitOut> {
		return request(this.url)('transfer_split', x);
	}

	sweepDust() {
		return request(this.url)('sweep_dust');
	}

	sweepAll(x: SweepAllIn): Observable<SweepAllOut> {
		return request(this.url)('sweep_all');
	}

	store(): Observable<StoreOut> {
		return request(this.url)('store');
	}

	getPayments(x: GetPaymentsIn): Observable<GetPaymentsOut> {
		return request(this.url)('get_payments', x);
	}

	getBulkPayments(x: GetBulkPaymentsIn): Observable<GetBulkPaymentsOut> {
		return request(this.url)('get_bulk_payments', x);
	}

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

	incomingTransfers(
		x: IncomingTransfersIn
	): Observable<IncomingTransfersOut> {
		return request(this.url)('incoming_transfers', x);
	}

	queryKey(x: QueryKeyIn): Observable<QueryKeyOut> {
		return request(this.url)('query_key', x);
	}

	makeIntegratedAddress(
		x: MakeIntegratedAddressIn
	): Observable<IntegratedAddress> {
		return request(this.url)('make_integrated_address', x);
	}

	splitIntegratedAddress(
		x: IntegratedAddress
	): Observable<SplitIntegratedAddressOut> {
		return request(this.url)('split_integrated_address', x);
	}

	stopWallet() {
		return request(this.url)('stop_wallet');
	}

	makeUri(x: MakeUriIn): Observable<Uri> {
		return request(this.url)('make_uri', x);
	}

	parseUri(x: Uri): Observable<MakeUriIn> {
		return request(this.url)('parse_uri', x);
	}

	getAddressBook(x: { entries: number[] }): Observable<GetAddressBookOut> {
		return request(this.url)('get_address_book', x);
	}

	addAddressBook(x: AddAddressBook): Observable<{ index: number }> {
		return request(this.url)('add_address_book', x);
	}

	deleteAddressBook(x: { index: number }) {
		return request(this.url)('delete_address_book', x);
	}

	openWallet(x: OpenWallet) {
		return request(this.url)('open_wallet', x);
	}

	createWallet(x: CreateWallet) {
		return request(this.url)('create_wallet', x);
	}

	other(method: string, arg?: any): Observable<any> {
		return request(this.url)(method, arg);
	}
}
