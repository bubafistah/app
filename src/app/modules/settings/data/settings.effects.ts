import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class SettingsEffects {
	changeLanguage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType('[Settings] Change Language'),
				switchMap((req: { language: string; type: string }) => [])
			),
		{ dispatch: false }
	);

	constructor(private actions$: Actions) {}
}
