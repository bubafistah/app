import {ApplicationRef, ComponentFactoryResolver, Injectable, Injector} from '@angular/core';
import {WalletComponent} from '@plugin/lthn/wallet/wallet.component';
import {NgElement, WithProperties} from '@angular/elements';


@Injectable()
export class PluginsService {

  constructor(
      private injector: Injector,
      private applicationRef: ApplicationRef,
      private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  showAsElement(message: string) {
    // Create element
    const popupEl: NgElement & WithProperties<WalletComponent> = document.createElement('lthn-app-wallet') as any;

    // Listen to the close event
   // popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

    // Set the message
   // popupEl.message = message;

    // Add to the DOM
    document.body.appendChild(popupEl);
  }

  showAsComponent(message: string) {
    // Create element
    const popup = document.createElement('lthn-app-wallet');

    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(WalletComponent);
    const popupComponentRef = factory.create(this.injector, [], popup);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(popupComponentRef.hostView);

    // Listen to the close even
    // Add to the DOM
    document.body.appendChild(popup);
  }
}
