import {Injectable} from '@angular/core';

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
		return this.backend('get', {object: key});
	}

	setItem(key: string, value: string) {
		return this.backend('set', {object: key, data: value});
	}

	removeItem(key) {
		this.backend('remove', {object: key});
	}

	clear() {
		this.backend('clear', {});
	}

	private backend(cmd:string, payload):string {
		const axios = require('axios').default;
		const ret = axios.post(`${this.apiUrl}/${cmd}`, {group: 'lthn-app', ...payload}).then((data) => data.data)
		return ret.data;
	}
}
