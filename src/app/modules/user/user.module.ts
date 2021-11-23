import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {UserComponent} from './user.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const routes: Routes = [
	{
		path: '',
		component: UserComponent,
		data: {
			title: 'New User - Lethean (LTHN)',
			heading: 'New User Wizard',
			description: 'Lethean (LTHN) New User Panel',
			robots: false
		}
	}
];

@NgModule({
	declarations: [UserComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatFormFieldModule,
		MatSelectModule,
		MatOptionModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		MatCardModule,
		MatInputModule,
		FlexModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		MatProgressBarModule
	]
})
export class UserModule {
}
