import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import decode from 'jwt-decode';
import { ChatService } from '../../chat.service';
import { Router } from '@angular/router';
import { Message } from '../../../../models/angularModels/Messages.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  x: any;

  message: '';
  httpOptions;
  userInfo;

  constructor(private http: HttpClient, private chat: ChatService, private router: Router) {  }


  ngOnInit() {
    this.readHttpOptionsAndUserInfo();
    this.getInterventi();
  }

  getInterventi() {
    try {
        this.x = this.http.get('http://localhost:3000/user/interventi', this.httpOptions);
        console.log(this.x);
    } catch (e) {
        console.log('errore in getInterventi ' + e);
    }
  }


  ticket() {
    try {
        this.chat.startSupport(this.message);
        this.router.navigate(['/user/chat']);
    } catch (e) {
        console.log(e);
    }
  }

  readHttpOptionsAndUserInfo () {
    try {
      const token = localStorage.getItem('jwtToken');
      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': token })
      };
    const tokenPayload = decode(token);
    this.userInfo = tokenPayload;

    } catch (e) {
      this.router.navigate(['/auth/user/login']);
      console.log('errore lettura token' + e);
    }
  }

}
