import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'lthn-app-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class StatusComponent {
	status_daemon: any;
	status_secure: any;
	status_private: any;
	status_annon: any;

	constructor(public dialog: MatDialog) {}
}
