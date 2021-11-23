import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APP_CONFIG } from '../../environments/environment';

export enum RxJsLoggingLevel {
	TRACE,
	DEBUG,
	INFO,
	ERROR,
	NONE
}

export let RxJsLogging = APP_CONFIG.debug;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
	RxJsLogging = level;
}

export const debugFunction = (
	level: number,
	message: string,
	subject?: any
) => {
	log(level, message, subject);
};

export const debug =
	(level: number, message: string) => (source: Observable<any>) =>
		source.pipe(
			tap((val) => {
				log(level, message, val);
			})
		);

const log = (level: number, message: string, subject: any = {}) => {
	if (level >= RxJsLogging) {
		if (level === RxJsLoggingLevel.TRACE) {
			console.trace(message + ': ', subject);
		}
		if (level === RxJsLoggingLevel.DEBUG) {
			console.debug(message + ': ', subject);
		}
		if (level === RxJsLoggingLevel.INFO) {
			console.info(message + ': ');
		}
		if (level === RxJsLoggingLevel.ERROR) {
			console.error(message + ': ', subject);
		}
		if (level === RxJsLoggingLevel.ERROR) {
			console.error(message + ': ', subject);
		}
	}
};
