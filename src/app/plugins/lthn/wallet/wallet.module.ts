import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewComponent } from './components/new.component';
import { RestoreComponent } from './components/restore.component';
import { BackupComponent } from './components/backup.component';
import { SettingsComponent } from './components/settings.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

];

@NgModule({
	declarations: [
		WalletComponent,
		NewComponent,
		RestoreComponent,
		BackupComponent,
		SettingsComponent
	],
	exports: [
		NewComponent,RestoreComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatCardModule,
		FlexModule,
		ReactiveFormsModule,
		MatListModule,
		MatButtonModule,
		MatCheckboxModule,
		MatExpansionModule,
		MatToolbarModule,
		MatIconModule,
		MatTooltipModule,
		MatInputModule
	]
})
export class WalletModule {}
