import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

export const WS_ENDPOINT = 'ws://127.0.0.1:36911/';

export interface Message {
	author: string;
	message: string;
}

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	static connection$: WebSocketSubject<any>;
	RETRY_SECONDS = 10;

	connect(): Observable<any> {
		if (WebsocketService.connection$) {
			return WebsocketService.connection$;
		} else {
			WebsocketService.connection$ = webSocket({
				url: WS_ENDPOINT,
				deserializer: ({ data }) => data
			});
			return WebsocketService.connection$;
		}
	}

	//
	// send(data: any) {
	//   if (this.connection$) {
	//     this.connection$.next(data);
	//   } else {
	//     console.error('Did not send data, open a connection first');
	//   }
	// }

	closeConnection() {
		if (WebsocketService.connection$) {
			console.log('close');
			WebsocketService.connection$.complete();
			WebsocketService.connection$ = null;
		}
	}
}
