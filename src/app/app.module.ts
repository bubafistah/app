import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {DataModule} from '@data/data.module';
import {StatusModule} from '@module/status/status.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FlexModule} from '@angular/flex-layout';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from '@module/auth/auth.module';
import {ConsoleModule} from '@plugin/console/console.module';
import {BlockchainService} from '@plugin/lthn/chain/blockchain.service';
import {WalletService} from '@plugin/lthn/wallet/wallet.service';
import {date} from 'random-js';


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({appId: 'lthn-data-sync'}),
		BrowserTransferStateModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		CommonModule,
		DataModule,
		StatusModule,
		MatSidenavModule,
		MatIconModule,
		MatDividerModule,
		MatListModule,
		MatToolbarModule,
		MatMenuModule,
		MatButtonModule,
		MatTooltipModule,
		FlexModule,
		AuthModule,
		ConsoleModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
/**
 * Application shell/bootstrap
 */
export class AppModule {

	/**
	 * Start blockchain & wallet service automatically on start
	 *
	 * @param {BlockchainService} chain
	 * @param {WalletService} wallet
	 */
	constructor(private chain: BlockchainService, private wallet: WalletService) {
		this.chain.startDaemon().then((data) => {
			console.log("blockchain started")
			this.wallet.startWallet().then((data) => console.log('wallet started'))
		})
	}
}
