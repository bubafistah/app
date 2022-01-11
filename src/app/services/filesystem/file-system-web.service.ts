import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileSystemInterface} from '@interface/file-system.interface';

@Injectable({
	providedIn: 'root'
})
export class FileSystemWebService implements FileSystemInterface {
	private apiUrl = 'https://localhost:36911/filesystem';

	constructor(private http: HttpClient) {
	}

	public exists(pathname): boolean {
		return pathname;
	}

	public async list(dirname) {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			responseType: 'text' as 'json'
		};
		return await this.http
			.post<any>(`${this.apiUrl}/list`, {path: dirname}, options)
			.toPromise()
			.then((dat) => JSON.parse(dat));
	}

	public mkdir(dirname): void {
		console.log(dirname)
	}

	public path(filename) {
		console.log(filename)
	}


	public async read(filename) {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			responseType: 'text' as 'json'
		};
		return await this.http
			.post<any>(`${this.apiUrl}/read`, {path: filename}, options)
			.toPromise()
			.then((dat) => atob(dat));
	}

	public async write(filename, data) {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		};

		return await this.http
			.post(
				`${this.apiUrl}/write`,
				{path: filename, data: btoa(data)},
				options
			)
			.toPromise();
	}


}
