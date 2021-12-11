import {Component, Injector, OnInit} from '@angular/core';
import {PluginsService} from '@plugin/plugins.service';
import {createCustomElement} from '@angular/elements';
import {WalletComponent} from '@plugin/lthn/wallet/wallet.component';

@Component({
  selector: 'lthn-app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  constructor(injector: Injector, public wallet: PluginsService) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(WalletComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('lthn-app-wallet', PopupElement);
  }

  ngOnInit(): void {
  }

}
