import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { NgTerminal } from 'ng-terminal';
import {WebsocketService} from '@service/websocket.service';
import { webSocket } from "rxjs/webSocket";


@Component({
	selector: 'lthn-app-console',
	templateUrl: './console.component.html',
	styleUrls: ['./console.component.scss'],
	encapsulation: ViewEncapsulation.None

})
export class ConsoleComponent implements OnInit, AfterViewInit {
	@ViewChild('term', { static: true }) child: NgTerminal;


	constructor(private ws: WebsocketService) {



	}

	ngOnInit(): void {
		this.ws.connect().subscribe((data) => this.child.write(data[1] + '\r\n'))
		this.ws.sendMessage('letheand')
    }

	ngAfterViewInit() {



//		if(this.child.keyEventInput) {
//
//			this.child.keyEventInput.subscribe((e) => {
//				console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);
//
//				const ev = e.domEvent;
//				const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
//
//				if (ev.keyCode === 13) {
//					this.child.write('\r\n$ ');
//				} else if (ev.keyCode === 8) {
//					if (this.child.underlying.buffer.active.cursorX > 2) {
//						this.child.write('\b \b');
//					}
//				} else if (printable) {
//					this.child.write(e.key);
//				}
//			});
//		}
	}
}
