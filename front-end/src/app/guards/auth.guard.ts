import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    /**
     * AuthGuard -
     * authenticate user from fetching information from session storage.
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {boolean}
     */

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let role = sessionStorage.getItem('role');
        let uname = sessionStorage.getItem('username');
        let email = sessionStorage.getItem('useremail');
        if (!(uname == null && role == null && email == null)) {
            return true;
        } else {
            this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
            return false;
        }
    }
}
