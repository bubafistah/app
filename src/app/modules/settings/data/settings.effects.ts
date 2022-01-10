import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class SettingsEffects {
	changeLanguage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType('[Settings] Change Language'),
				switchMap((req: { language: string; type: string }) => {
					return this.translate.use(req.language)
				})
			),
		{ dispatch: false }
	);

	constructor(private actions$: Actions, private translate: TranslateService) {}
}
