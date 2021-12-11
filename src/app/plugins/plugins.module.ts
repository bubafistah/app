import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsComponent } from 'app/plugins/plugins.component';
import {PluginsService} from '@plugin/plugins.service';



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
