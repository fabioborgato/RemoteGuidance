import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

        canActivate(route: ActivatedRouteSnapshot): boolean {
            try {
                    // this will be passed from the route config
                // on the data property
                const expectedRole = route.data.expectedRole;
                console.log(expectedRole);
                const token = localStorage.getItem('jwtToken');
                // decode the token to get its payload
                const tokenPayload = decode(token);
                if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {
                      this.router.navigate(['auth/user/login']);
                  return false;
                }
                return true;
          } catch (e) {
            console.log('error in role guard service ' + e);
            this.router.navigate(['/auth/user/login']);
          }
        }

}
