import {WebsocketService} from '@service/websocket.service';
import {Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ChangeDetectorRef, PLATFORM_ID, Inject} from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import {DisplayOption, NgTerminal, FunctionsUsingCSI} from 'ng-terminal';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {isPlatformBrowser} from '@angular/common';

@Component({
	selector: 'lthn-app-console',
	templateUrl: './console.component.html',
	styleUrls: ['./console.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.Default


})
export class ConsoleComponent implements OnInit, AfterViewInit {

	@Input() attach  = 'lethean-wallet-rpc';
	private command: string[] = []
	private sub$;
	title = 'NgTerminal Live Example';
	color = 'accent';

	public resizable: boolean;
	public fixed = false;

	disabled = true;
	rowsControl = new FormControl();
	colsControl = new FormControl();
	inputControl = new FormControl();

	displayOption: DisplayOption = {};
	displayOptionBounded: DisplayOption = {};//now it's not used
	@Inject(PLATFORM_ID) platformId: Object
	@ViewChild('term', {static: false}) child: NgTerminal;
	constructor(private ws: WebsocketService, private ref: ChangeDetectorRef) {
		this.ref.detach()
		setInterval(() => {
			this.ref.detectChanges();
		}, 1000);

	}

	ngOnInit(): void {
		if(isPlatformBrowser(this.platformId)) {
			let that = this;
			this.disabled = false
			this.rowsControl.setValue(10);
			this.colsControl.setValue(40);
			this.ref.detectChanges();
			this.ws.connect().subscribe((data) => {
				if (this.attach === data[0]) {
					this.child.write(data[1] + '\r\n');
					that.ref.markForCheck()
				}

			})
			this.changeStream(this.attach)
		}else{
			this.disabled = true
		}
    }

	getSub(){
		this.sub$ = this.ws.connect();
	}

	changeStream(channel:string){
		this.ws.sendMessage(`daemon:${this.attach}`)
		this.ref.markForCheck()
	}

//	ngAfterViewInit() {
//		const that = this;
//		this.child.write('$ ');
//		if(this.child.keyEventInput) {
//
//			this.child.keyEventInput.subscribe((e) => {
//				//console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);
//
//				const ev = e.domEvent;
//				const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
//
//				if (ev.keyCode === 13) {
//
//					//console.log(`cmd:letheand:${this.command.join('')}`)
//					that.ws.sendMessage(`cmd:letheand:${this.command.join('')}\n`)
//					this.command = []
//					//this.child.write('\r\n$ ');
//					this.ref.detectChanges();
//				} else if (ev.keyCode === 8) {
//					 this.command.pop()
//					if (this.child.underlying.buffer.active.cursorX > 0) {
//						this.child.write('\b \b');
//						this.ref.detectChanges();
//					}
//				} else if (printable) {
//					this.command.push(e.key);
//					this.child.write(e.key);
//					this.ref.detectChanges();
//				}
//				//console.log(this.command.join(""))
//			});
//		}
//
//	}
	ngAfterViewInit() {
		if(isPlatformBrowser(this.platformId)) {
			this.invalidate();
			this.child.write('$ ');
			this.child.keyInput.subscribe((input) => {
				//do nothing because it will be replaced keyEventInput
			})

			this.child.keyEventInput.subscribe(e => {
				console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

				const ev = e.domEvent;
				const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

				if (ev.keyCode === 13) {
					this.child.write('\n' + FunctionsUsingCSI.cursorColumn(1) + '$ '); // \r\n
				} else if (ev.keyCode === 8) {
					// Do not delete the prompt
					if (this.child.underlying.buffer.active.cursorX > 2) {
						this.child.write('\b \b');
					}
				} else if (printable) {
					this.child.write(e.key);
				}
			})
			this.rowsControl.valueChanges.subscribe(() => {
				this.invalidate()
			});
			this.colsControl.valueChanges.subscribe(() => {
				this.invalidate()
			});
		}
	}
	writeSubject = new Subject<string>();
	write() {
		this.writeSubject.next(eval(`'${this.inputControl.value}'`));
	}

	keyInput: string;
	onKeyInput(event: string) {
		this.keyInput = event;
	}

	get displayOptionForLiveUpdate() {
		return JSON.parse(JSON.stringify(this.displayOption));
	}

	invalidate() {
		if (this.resizable)
			this.displayOption.activateDraggableOnEdge = { minWidth: 100, minHeight: 100 };
		else
			this.displayOption.activateDraggableOnEdge = undefined;
		if (this.fixed)
			this.displayOption.fixedGrid = { rows: this.rowsControl.value, cols: this.colsControl.value };
		else
			this.displayOption.fixedGrid = undefined;
		this.child.setDisplayOption(this.displayOption);
	}

	resizableChange(event: MatSlideToggleChange) {
		this.resizable = event.checked;
		if (this.resizable){
			this.child.setStyle({"border": "4px solid #85858a"});
			this.fixed = false;
		}
		this.invalidate();
	}

	fixedChange(event: MatSlideToggleChange) {
		this.fixed = event.checked;
		if (this.fixed){
			this.child.setStyle({"border": "unset"});
			this.resizable = false;
		}
		this.invalidate();
	}
}
