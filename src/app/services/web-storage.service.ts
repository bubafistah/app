import {Injectable} from '@angular/core';
import {atob, btoa} from 'bytebuffer';

@Injectable({
	providedIn: 'root'
})
export class WebStorageService implements Storage {

	private items = [];
	private apiUrl = 'https://localhost:36911/object';

	get length() {
		return this.items.length;
	}

	key(key:number): string | null {
		return this.items[key]
	}

	getItem(key): string | null {
		try {
			return this.backend('get', {object: key});
		}catch (e){
			console.log('getItem Error')
		}
		return null;
	}

	setItem(key: string, value: string) {
		try {
			return this.backend('set', {object: key, data: value});
		}catch (e){
			console.log('setItem Error')
		}
		return null;

	}

	removeItem(key) {
		this.backend('remove', {object: key});
	}

	clear() {
		this.backend('clear', {});
	}

	/**
	 * Performs call to backend object store
	 *
	 * @param {string} cmd
	 * @param payload
	 * @returns {string | null}
	 * @private
	 */
	private backend(cmd:string, payload: any):string|null {
		const axios = require('axios').default;
		try {
			const ret = axios.post(`${this.apiUrl}/${cmd}`, atob({group: 'lthn-app', ...payload})).then((data) => data.data)
			return ret.data;
		}catch (NetworkError) {
			console.log('HTTP Error')
		}
		return null
	}
}
