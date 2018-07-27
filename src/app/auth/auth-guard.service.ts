
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

      constructor(public auth: AuthService, public router: Router) {}

      canActivate(): boolean {
        try {
          if (!this.auth.isAuthenticated()) {
            this.router.navigate(['auth/admin/login']);
            return false;
          }
          return true;
        } catch (e) {
          console.log('error in can activate' + e);
        }
      }
}
