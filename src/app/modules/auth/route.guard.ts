import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {FileSystemService} from '@service/filesystem/file-system.service';
import {APP_CONFIG} from '@env/environment';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authService: AuthService,
		private fileSystem: FileSystemService
	) {
	}


	/**
	 * Handles logged out access
	 * Run during routing to check if the user is logged in or not, we do this check if
	 * getAuthStatus() returns true, the username variable is set, to logout simply clear the username
	 *
	 * If the user is not authenticated this function acts in one of two ways
	 *
	 * 1) if ~/Lethean/users is empty perform first run / welcome
	 * 2) if users do exsist, take to the /login page
	 *
	 * if APP_CONFIG.production === false auth check is bypassed, but without login decryption cant happen
	 * you may or may not have to login to develop, for now at least
	 *
	 * @param {ActivatedRouteSnapshot} route
	 * @param {RouterStateSnapshot} state
	 * @returns {boolean | Promise<boolean>}
	 */
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Promise<boolean> {
		let isAuthenticated = this.authService.getAuthStatus();
		if (!isAuthenticated) {
			try {
				this.fileSystem.listFiles('/users').then((dat: any) => {
					if (dat.length > 0) {
						this.router.navigate(['/login']);
					} else {
						this.router.navigate(['/user']);
					}
				});
			}catch (e) {
				isAuthenticated = false
			}

		}
		return isAuthenticated;
	}
}
