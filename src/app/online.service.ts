import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs/add/operator/map';
import decode from 'jwt-decode';
import { ConnectedAdmin } from './onlineAdmins.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  constructor(private socket: Socket, private http: HttpClient, private router: Router) {
      this.readToken();
   }

  userInfo = {
    _id: String,
    username: String,
    role: String,
    specializzazione: '',
    photoURL: ''
  };

  joint() {
    try {
        this.socket.emit('join', this.userInfo);
    } catch (e) {
          console.log(e);
    }
  }


  getOnlineAdmins() {
    try {
      return this.socket
      .fromEvent('onlineAdmin')
      .map( data => {
        console.log('ONLINE ADMIN');
        console.log(<ConnectedAdmin[]>data);
        return <ConnectedAdmin[]>data;
      });
    } catch (e) {
      console.log(e);
    }
  }

  getOnlineAdminHttp() {
    try {
      return this.http.get('http://localhost:3000/user/onlineAdmin')
      .map( data => {
        console.log('ONLINE ADMIN HTTP');
        console.log(<ConnectedAdmin[]>data);
        return <ConnectedAdmin[]>data;
      });
    } catch (e) {
      console.log(e);
    }
  }

  readToken () {
    try {
          const token = localStorage.getItem('jwtToken');
          const tokenPayload = decode(token);
         // this.userInfo = tokenPayload;

          this.userInfo.username = tokenPayload.username;
          this.userInfo.role = tokenPayload.role;
          this.userInfo.specializzazione = 'test specializzazione',
          this.userInfo._id = tokenPayload._id;
          // tslint:disable-next-line:max-line-length
          this.userInfo.photoURL = 'https://firebasestorage.googleapis.com/v0/b/remoteguidance-f2edb.appspot.com/o/5b39da7e7ee55628b08485ac?alt=media&token=e7c254d0-94ee-4320-9530-15f9d76fb8a9';

          console.log('user Info read Token');
          console.log(this.userInfo);
    } catch (e) {
        //  this.router.navigate(['/auth/user/login']);
          console.log('errore lettura token' + e);
    }
  }

}
