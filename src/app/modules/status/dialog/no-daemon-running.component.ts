import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
	animal: string;
	name: string;
}

@Component({
	selector: 'lthn-app-status-no-daemon',
	templateUrl: 'no-daemon-running.component.html'
})
export class NoDaemonRunningDialog {
	constructor(
		public dialogRef: MatDialogRef<NoDaemonRunningDialog>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
