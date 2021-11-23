import { Component, OnInit } from '@angular/core';
import {
	colors,
	names,
	starWars,
	uniqueNamesGenerator
} from 'unique-names-generator';

@Component({
	selector: 'lthn-user-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	public randomAlias: string = uniqueNamesGenerator({
		dictionaries: [names, colors, starWars],
		style: 'capital',
		separator: ' '
	});

	constructor() {}

	ngOnInit(): void {}
}
