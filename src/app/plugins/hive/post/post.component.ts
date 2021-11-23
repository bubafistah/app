import { Component, OnInit } from '@angular/core';
import { Client } from '@hiveio/dhive';
import { Router } from '@angular/router';

@Component({
	selector: 'lthn-app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	public post = {};
	public title = '';
	public content = '';
	public author = '';
	private subs: any = {};

	constructor(private router: Router) {}

	ngOnInit(): void {
		const client = new Client([
			'https://api.hive.blog',
			'https://api.hivekings.com',
			'https://anyx.io',
			'https://api.openhive.network'
		]);
		const slug = this.router.routerState.snapshot.url.replace('/p/', '');
		const that = this;
		console.log(this.router.routerState.snapshot.url);

		client.database.getState(`/hive-179211/@${slug}`).then(function (post) {
			that.post = post;

			that.content = post.content[slug].body;
			that.title = post.content[slug].title;
			that.author = post.content[slug].author;
			console.log(post);
		});
	}
}
