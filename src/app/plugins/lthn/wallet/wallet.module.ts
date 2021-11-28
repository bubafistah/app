import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewComponent } from './components/new.component';
import { RestoreComponent } from './restore/restore.component';
import { BackupComponent } from './backup/backup.component';
import { SettingsComponent } from './settings/settings.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: 'restore',
		component: RestoreComponent,
		data: {
			title: 'Restore Wallet - Lethean (LTHN)',
			heading: 'Restore Wallet',
			description: 'Restore Wallet',
			robots: false
		}
	},
	{
		path: 'backup',
		component: BackupComponent,
		data: {
			title: 'Backup Wallet - Lethean (LTHN)',
			heading: 'Backup Wallet',
			description: 'Backup Wallet',
			robots: false
		}
	},
	{
		path: 'settings',
		component: SettingsComponent,
		data: {
			title: 'Wallet Settings - Lethean (LTHN)',
			heading: 'Wallet Settings',
			description: 'Wallet Settings',
			robots: false
		}
	}
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
		NewComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatCardModule,
		FlexModule,
		ReactiveFormsModule,
		MatListModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatTooltipModule,
		MatInputModule
	]
})
export class WalletModule {}
