import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import * as ChartsActions from './actions';
import {of, Subject, timer} from 'rxjs';
import {select, State, Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {debug, RxJsLoggingLevel} from '@data/debug.rxjs';
import {ChartDifficulty} from './interfaces/difficulty.state';
import {selectChartOptions} from './selectors';

@Injectable()
export class ChartsEffects {
	private static pollingUntil$ = {
		ChartNetworkDifficulty$: new Subject<boolean>()
	};
	// LoadRequestedChartDifficulty$ = createEffect(() =>
	//     this.actions$.pipe(
	//         ofType(ChartsActions.chartNetworkDifficultyLoadRequested),
	//         switchMap(() =>
	//             this.http.get<ChartDifficulty[]>(`https://api.hashvault.pro/v3/lethean/network/chart/difficulty`)
	//                 .pipe(
	//                     map(
	//                         (networkDifficulty) => ChartsActions.chartNetworkDifficultyLoadSuccess({
	//                                 networkDifficulty,
	//                             }
	//                         ),
	//                         catchError((error) => {
	//                                 console.error(error);
	//                                 return of(ChartsActions.chartNetworkDifficultyLoadFailure({error}));
	//                             }
	//                         )
	//                     )
	//                 )
	//         )
	//     )
	// );

	LoadRequestedChartDifficulty$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ChartsActions.chartNetworkDifficultyLoadRequested),
			debug(
				RxJsLoggingLevel.INFO,
				'RxJs Action: ChartNetworkDifficultyLoadRequested'
			),
			withLatestFrom(
				this.store$.pipe(
					select(selectChartOptions('networkDifficulty'))
				)
			),
			debug(
				RxJsLoggingLevel.DEBUG,
				'RxJs Option: selectHashrateMinersOptions'
			),
			//@ts-ignore
			switchMap(([action, options]) =>
				// Start polling
				timer(0, options.pollingInterval).pipe(
					takeUntil(
						ChartsEffects.pollingUntil$.ChartNetworkDifficulty$
					),
					debug(
						RxJsLoggingLevel.INFO,
						'RxJs Timer: ChartNetworkDifficultyLoadRequested'
					),
					switchMap(() =>
						this.http
							.get<ChartDifficulty[]>(
								`https://api.hashvault.pro/v3/lethean/network/chart/difficulty`
							)
							.pipe(
								debug(
									RxJsLoggingLevel.INFO,
									'/network/chart/difficulty HTTP Response:'
								),
								debug(RxJsLoggingLevel.DEBUG, ''),
								map(
									(payload) =>
										ChartsActions.chartNetworkDifficultyLoadSuccess(
											{
												networkDifficulty: payload
											}
										),
									catchError((error) =>
										//console.error(error);
										of(
											ChartsActions.chartNetworkDifficultyLoadFailure(
												{error}
											)
										)
									)
								)
							)
					)
				)
			)
		)
	);

	ChartNetworkDifficultyStartPolling$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ChartsActions.chartNetworkDifficultyStartPolling),
			debug(
				RxJsLoggingLevel.INFO,
				'RxJs Action: ChartNetworkDifficultyStartPolling'
			),
			map(() => {
				ChartsEffects.pollingUntil$.ChartNetworkDifficulty$.next(true);
				return ChartsActions.chartNetworkDifficultyLoadRequested();
			})
		)
	);
	ChartNetworkDifficultyStopPolling$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ChartsActions.chartNetworkDifficultyStopPolling),
			debug(
				RxJsLoggingLevel.INFO,
				'RxJs Action: ChartNetworkDifficultyStopPolling'
			),
			map(() => {
				ChartsEffects.pollingUntil$.ChartNetworkDifficulty$.next(true);
				return ChartsActions.chartNetworkDifficultyStoppedPolling();
			})
		)
	);

	constructor(
		private actions$: Actions,
		private store$: Store<State<any>>,
		private http: HttpClient
	) {
	}
}
