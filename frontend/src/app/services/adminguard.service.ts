import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import axios from 'axios';

@Injectable()
export class AdminGuardService implements CanActivate {
	uri = 'http://localhost:4000';
	constructor(private auth: AuthenticationService, private router: Router) { }

	async canActivate() {
		const token = this.auth.getToken();
		if (token !== null) {
			const isAdmin = await axios.get(`${this.uri}/admin/authenticate`, { headers: { Authorization: `Bearer ${token}` } });
			if (isAdmin.data === true) {
				return isAdmin.data;
			} else {
				this.router.navigateByUrl('/login');
				return isAdmin.data;
			}
		} else {
			this.router.navigateByUrl('/login');
			return false;
		}
	}
}
