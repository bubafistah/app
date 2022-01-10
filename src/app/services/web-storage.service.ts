import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class WebStorageService implements Storage {

	private items = {};
	private count = 0
	private apiUrl = 'https://localhost:36911/object';

	get length() {
		return this.count;
	}

	key(key:number): string | null {
		return this.items[key]
	}

	getItem(key): string | null {
		try {
			const ret = this.backend('get', {object: key});
			if(ret){
				return JSON.parse(ret)
			}
		}catch (e){
			console.log('getItem Error')
		}
		return null;
	}

	setItem(key: string, value: string) {
		try {
			this.count++
			return this.backend('set', {object: key, data: value});
		}catch (e){
			console.log('setItem Error')
		}
		return null;

	}

	removeItem(key) {
		delete this.items[key]
		this.count--
		this.backend('remove', {object: key});
	}

	clear() {
		this.items ={}
		this.count = 0
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
			const ret = axios.post(`${this.apiUrl}/${cmd}`, {group: 'lthn-app', ...payload}).then((data) => data.data)
			return ret.data;
		}catch (NetworkError) {
			console.log('HTTP Error')
		}
		return null
	}
}
