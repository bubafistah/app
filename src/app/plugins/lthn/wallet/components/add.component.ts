import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
	selector: 'lthn-wallet-add',
	templateUrl: './add.component.html'
})
export class AddComponent implements OnInit, OnChanges {
	@Input() targetAddForm: string = 'open';
	targetTabIndex: number = 0;

	constructor() { }

	ngOnInit(): void {
		this.setTargetTabIndex();
	}

	setTargetTabIndex(): void {
		if (this.targetAddForm === "open") {
			this.targetTabIndex = 2;
		}else if (this.targetAddForm === "restore") {
			this.targetTabIndex = 1;
		}else{
			this.targetTabIndex = 0;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		this.setTargetTabIndex();
	}

}
