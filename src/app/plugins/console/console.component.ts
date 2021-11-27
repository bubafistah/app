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


	private command: string[] = []

	constructor(private ws: WebsocketService) {

console.log("console")

	}

	ngOnInit(): void {
		this.ws.connect().subscribe((data) => this.child.write(data[1] + '\r\n'))
		this.ws.sendMessage('daemon:letheand')

    }

	ngAfterViewInit() {

		const that = this;
		this.child.write('$ ');
		if(this.child.keyEventInput) {

			this.child.keyEventInput.subscribe((e) => {
				//console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

				const ev = e.domEvent;
				const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

				if (ev.keyCode === 13) {

					//console.log(`cmd:letheand:${this.command.join('')}`)
					that.ws.sendMessage(`cmd:letheand:${this.command.join('')}`)
					this.command = []
					this.child.write('\r\n$ ');
				} else if (ev.keyCode === 8) {
					 this.command.pop()
					if (this.child.underlying.buffer.active.cursorX > 0) {
						this.child.write('\b \b');
					}
				} else if (printable) {
					this.command.push(e.key);
					this.child.write(e.key);
				}
				//console.log(this.command.join(""))
			});
		}
	}
}
