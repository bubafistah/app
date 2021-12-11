import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, takeWhile, withLatestFrom} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {select, Store} from '@ngrx/store';
import * as WalletActions from './actions';
import * as WalletSelectors from './selectors';
import {merge, of, timer} from 'rxjs';
import {selectOpenedWalletData, selectWalletData} from './selectors';
import {HttpClient} from '@angular/common/http';
import {rpcBody} from '@service/json-rpc';
import {Balance, GetTransfersIn, GetTransfersOut} from '@plugin/lthn/wallet/interfaces';
import {WalletTransfers} from './actions';
import {debug} from '@data/debug.rxjs';

@Injectable()
export class WalletEffects {
	openWallet = createEffect(
		() =>
			this.actions$.pipe(
				ofType('[Wallet] Open Wallet'),
				switchMap((req: { address: string; password: string }) => {
					return this.wallet.openWallet({
						filename: req.address,
						password: req.password
					});
				})
			),
		{dispatch: false}
	);

	WalletLoadData$ =
		createEffect(() => this.actions$.pipe(
				// Filter action type
				ofType(WalletActions.WalletLoadData),
				// Get the polling interval
				withLatestFrom(this.store.pipe(select(WalletSelectors.selectOpenedWalletData))),
				switchMap(([action, wallet]) => merge(
							timer(0, wallet.options.pollingInterval).pipe(
								takeWhile(() => this.isPollingActiveStats),
								switchMap(() =>
									merge(
										this.http.post<any>(`https://localhost:36911/daemon/wallet/json_rpc`,
											JSON.stringify(rpcBody('getbalance')('')))
											.pipe(
												map((res: any) => {
													this.store.dispatch( WalletActions.WalletBalance({
														address: wallet.name,
														balance: res['result'] as Balance
													}))
													}
												)
											),
										this.http.post<any>(`https://localhost:36911/daemon/wallet/json_rpc`,
											JSON.stringify(rpcBody('get_transfers')({in: true, out: true, failed: true, pending: true } as GetTransfersIn)))
											.pipe(
												map((res: any) => {
													this.store.dispatch( WalletActions.WalletTransfers({
														address: wallet.name,
													 	transfers: res['result'] as GetTransfersOut[]
													}))

													}
												)
											)
									)
								)
							)
						).pipe(
							map((payload) => {
									return WalletActions.WalletLoaded();
								},
								catchError((error) => {
										console.error(error);
										return of(WalletActions.WalletFailure({error}));
									}
								)
							)
						)

				)
			)
		);

	StartPollingWallet$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WalletActions.WalletStartPolling),
			map(() => {
				this.isPollingActiveStats = true;
				return WalletActions.WalletLoadData();
			})
		));
	StopPollingWallet$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WalletActions.WalletStopPolling),
			map(() => {
				this.isPollingActiveStats = false;
				return WalletActions.WalletStoppedPolling();
			})
		));

	private isPollingActiveStats = false;

	constructor(private actions$: Actions, private http: HttpClient, private translate: TranslateService, private store: Store, private wallet: WalletService) {
	}
}
