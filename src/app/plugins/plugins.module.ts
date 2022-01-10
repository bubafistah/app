import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PluginsService} from '@plugin/plugins.service';
import {PluginsComponent} from '@plugin/plugins.component';


@NgModule({
  declarations: [
    PluginsComponent
  ],
  exports: [
    PluginsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PluginsService
  ]
})
export class PluginsModule { }
