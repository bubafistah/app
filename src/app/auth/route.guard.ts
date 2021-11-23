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

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Promise<boolean> {
		let isAuthenticated = this.authService.getAuthStatus();
		// @todo try to attack this variable in compiled app
		if (!APP_CONFIG.production) {
			isAuthenticated = true;
		}
		if (!isAuthenticated) {
			this.fileSystem.listFiles('/users').then((dat: any) => {
				if (dat.length > 0) {
					this.router.navigate(['/login']);
				} else {
					this.router.navigate(['/user']);
				}
			});
		}
		return isAuthenticated;
	}
}
