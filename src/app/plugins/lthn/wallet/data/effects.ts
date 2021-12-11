import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {Store} from '@ngrx/store';

@Injectable()
export class WalletEffects {
	openWallet = createEffect(
		() =>
			this.actions$.pipe(
				ofType('[Wallet] Open Wallet'),
				switchMap((req: { name: string; password: string }) => {
					return this.wallet.openWallet({
						filename: req.name,
						password: req.password
					})
				})
			),
		{ dispatch: false }
	);

	constructor(private actions$: Actions, private translate: TranslateService, private store: Store, private wallet: WalletService) {}
}
