import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {changeLanguage, selectLanguage, selectMenuVisibility, toggleHideNavigation} from '@module/settings/data';
import {Subscription} from 'rxjs';
import {getChainInfo} from '@plugin/lthn/chain/data';

@Component({
	selector: 'lthn-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	public menu: boolean;
	public heading = '';


	@ViewChild('sidenav') public sidenav: MatSidenav;
	public currentFlag: any;
	public currentLanguage$: Subscription;
	public currentLanguage: string;
	private menu$: Subscription;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		private metaService: Meta,
		private translate: TranslateService,
		private store: Store
	) {
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.setDefaultLang('en');
	}

	ngOnInit(): void {
		// setup language watcher
		this.currentLanguage$ = this.store.pipe(select(selectLanguage)).subscribe((lang) => {
			this.currentLanguage = lang;
			this.translate.use(lang)
		})

		this.updateMeta();
	}

	public ngAfterViewInit() {
		this.menu$ = this.store.pipe(select(selectMenuVisibility)).subscribe((opened) => {
			this.menu = opened
			this.sidenav.toggle();
		})


	}

	changeLanguage(lang: string){
		this.store.dispatch(changeLanguage({language: lang}))
	}

	toggleMenu() {
		this.store.dispatch(toggleHideNavigation())

	}

	updateMeta() {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				const rt = this.getChild(this.activatedRoute);
				rt.data.subscribe((data) => {
					this.titleService.setTitle(this.translate.instant(data.title));
					this.heading = data.heading;
					if (data.description) {
						this.metaService.updateTag({
							name: 'description',
							content: this.translate.instant(data.description)
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
