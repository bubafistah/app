import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {changeLanguage, selectLanguage, selectMenuVisibility, toggleHideNavigation} from '@module/settings/data';
import {Subscription} from 'rxjs';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {BlockchainService} from '@plugin/lthn/chain/blockchain.service';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';

@Component({
	selector: 'lthn-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	public menu: boolean;
	public heading = '';

	@BlockUI() blockUI: NgBlockUI;
	@ViewChild('sidenav') public sidenav: MatSidenav;
	public currentFlag: any;
	public currentLanguage$: Subscription;
	public currentLanguage: string;
	private menu$: Subscription;

	/**
	 * Starts the Angular framework and configures system plugins
	 *
	 * @param {Router} router
	 * @param {ActivatedRoute} activatedRoute
	 * @param {Title} titleService
	 * @param {Meta} metaService
	 * @param {TranslateService} translate
	 * @param {Store} store
	 * @param {FileSystemService} fs
	 * @param {BlockchainService} chain
	 * @param {WalletService} wallet
	 */
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		private metaService: Meta,
		private translate: TranslateService,
		private store: Store,
		private fs: FileSystemService,
		private chain: BlockchainService,
		private wallet: WalletService,
	) {

		translate.setDefaultLang('en');
		let lang = translate.getBrowserLang()
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use(lang ? lang : 'en');
	}

	/**
	 * Start loading overlay
	 * Setup language setting watcher
	 * Update View Meta data
	 */
	ngOnInit(): void {

		this.translate.get('words.states.loading').subscribe((res: string) => {
			this.blockUI.start(res);
		});

		// setup language watcher
		this.currentLanguage$ = this.store.pipe(select(selectLanguage)).subscribe((lang) => {
			this.currentLanguage = lang;
			this.translate.use(lang)
		})

		this.updateMeta();
	}

	/**
	 * Setup watcher for sidenav menu user setting
	 */
	ngAfterViewInit() {
		this.menu$ = this.store.pipe(select(selectMenuVisibility)).subscribe((opened) => {
			this.menu = opened
			this.sidenav.toggle();
		})
		this.startChain();

	}

	/**
	 * Dispatch a language change request
	 *
	 * @param {string} lang
	 */
	changeLanguage(lang: string){
		this.store.dispatch(changeLanguage({language: lang}))
	}

	/**
	 * Dispatch a Menu toggle request
	 */
	toggleMenu() {
		this.store.dispatch(toggleHideNavigation())
	}

	/**
	 * creates subscriptions for multi lingual page meta
	 */
	updateMeta() {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				const rt = this.getChild(this.activatedRoute);
				rt.data.subscribe((data) => {
					this.translate.get(data.title).subscribe((res: string) => {
						this.titleService.setTitle(res)
					});

					this.heading = data.heading;
					if (data.description) {

						this.translate.get(data.description).subscribe((res: string) => {
							this.metaService.updateTag({
								name: 'description',
								content: data.description
							});
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

	/**
	 * Start chain daemon and wallet service
	 * unblock UI
	 */
	startChain() {
		this.fs.listFiles('/cli').then((dat: any) => {
			if(dat.length > 2){
				this.chain.startDaemon().then((data) => {
					this.blockUI.stop();
					this.wallet.startWallet().then(r => r);
				})
			}

		});
	}

	/**
	 * Angular router helper
	 *
	 * @param {ActivatedRoute} activatedRoute
	 * @returns {any}
	 */
	getChild(activatedRoute: ActivatedRoute) {
		if (activatedRoute.firstChild) {
			return this.getChild(activatedRoute.firstChild);
		} else {
			return activatedRoute;
		}
	}
}
