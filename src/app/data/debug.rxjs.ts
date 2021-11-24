import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {APP_CONFIG} from '@env/environment';

/**
 * Observable logging levels
 */
export enum RxJsLoggingLevel {
	TRACE,
	DEBUG,
	INFO,
	ERROR,
	NONE
}

/**
 * Current log level
 *
 * @type {number}
 */
export let RxJsLogging = APP_CONFIG.debug;

/**
 * Adjust the logging level during runtime
 *
 * setRxJsLoggingLevel(4) = off
 * setRxJsLoggingLevel(0) - tmi
 *
 * @param {RxJsLoggingLevel} level
 */
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

/**
 * debug pipe
 *
 * Observable.debug
 *
 * @param {number} level
 * @param {string} message
 * @returns {(source: Observable<any>) => Observable<any>}
 */
export const debug =
	(level: number, message: string) => (source: Observable<any>) =>
		source.pipe(
			tap((val) => {
				log(level, message, val);
			})
		);

/**
 * Observable Logging
 *
 * Logs to console respecting runtime debug level
 *
 * @param {number} level
 * @param {string} message
 * @param subject
 */
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
