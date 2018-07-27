
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
      constructor(public jwtHelper: JwtHelperService) {}

      public isAuthenticated(): boolean {
        try {
            const token = localStorage.getItem('jwtToken');
            return !this.jwtHelper.isTokenExpired(token);
        } catch (e) {
            console.log('user not auth' + e);
            return false;
        }
        // Check whether the token is expired and return
        // // true or false
        // console.log('TOKEN = ' + token);
        // console.log('TOKEN EXPIRATION DATE' + this.jwtHelper.getTokenExpirationDate(token));
        // console.log('TOKEN DECODED' + this.jwtHelper.decodeToken(token));
        // console.log("IS TOKEN EXPIRED? " + this.jwtHelper.isTokenExpired(token));
  }
}
