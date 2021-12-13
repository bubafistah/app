import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'lthn-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	username = new FormControl('');
	password = new FormControl('');
	passwordRepeat = new FormControl('');
	error = '';

	constructor(private authService: AuthService, private router: Router) {
	}

	inputChanged(){
		// Reset error after inputs are changed
		this.error = '';
	}

	async submit() {
		this.authService.login(this.username.value, this.password.value)
		.then(() => {
			if (this.authService.getAuthStatus()) {
				this.router.navigateByUrl('/');
			} else {
				this.error = 'Login Failed, try again.';
			}
		})
		.catch(() => {
			this.error = 'Login Failed, try again.';
		})
	}
}
