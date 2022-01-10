import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VpnComponent} from './vpn.component';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	declarations: [VpnComponent],
	imports: [CommonModule, MatCardModule, FlexModule, MatButtonModule]
})
export class VpnModule {}
