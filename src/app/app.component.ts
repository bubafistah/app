import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'lthn-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public menu = false;
	public heading = '';
	public currentLanguage = 'en';

	@ViewChild('sidenav') public sidenav: MatSidenav;
	public currentFlag: any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		private metaService: Meta,
		private translate: TranslateService
	) {
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.setDefaultLang('en');

		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use('en');
	}

	ngOnInit(): void {
		this.updateMeta();
	}

	changeLanguage(lang: string){
		this.currentLanguage = lang
		this.translate.use(lang);
	}
	openMenu() {
		this.menu = true;
		this.sidenav.open();
	}

	closeMenu() {
		this.menu = false;
		this.sidenav.close();
	}

	updateMeta() {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				const rt = this.getChild(this.activatedRoute);

				rt.data.subscribe((data) => {
					this.titleService.setTitle(data.title);
					this.heading = data.heading;
					if (data.description) {
						this.metaService.updateTag({
							name: 'description',
							content: data.description
						});
					} else {
						this.metaService.removeTag("name='description'");
					}

					if (!data.robots) {
						this.metaService.updateTag({
							name: 'robots',
							content: 'nofollow,noindex'
						});
					} else {
						this.metaService.updateTag({
							name: 'robots',
							content: 'follow,index'
						});
					}
				});
			});
	}

	getChild(activatedRoute: ActivatedRoute) {
		if (activatedRoute.firstChild) {
			return this.getChild(activatedRoute.firstChild);
		} else {
			return activatedRoute;
		}
	}
}
