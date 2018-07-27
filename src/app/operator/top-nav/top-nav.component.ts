import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-top-nav-op',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavOperatorComponent implements OnInit {

  constructor() { }

  userInfo: {
    id: String;
    username: String
    email: String;
    phone: String;
    company: String;
    photoURL: String;
};

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const token = localStorage.getItem('jwtToken');
    const tokenPayload = decode(token);
    this.userInfo = tokenPayload;
  }
}
