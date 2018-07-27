import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-loginop',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginOperatorComponent implements OnInit {

  loginData = { username: '', password: '' };
  message = '';
  data: any;
  httpOptions;


  // interventoData = { titolo: 'Title', desc: 'descrizione', date: '13/24/12', durata: 12  };
  // interventiData = [{
  //     titolo: '', desc: '', date: '', durata: 0
  // }];

  constructor(private http: HttpClient, private router: Router, public auth: AuthService) { }

  ngOnInit() {
        this.checkIfLoggedIn();
  }

  login() {

        this.http.post('http://localhost:3000/auth/user/login', this.loginData).subscribe(resp => {
              this.data = resp;
              console.log(this.data);
              localStorage.setItem('jwtToken', this.data.token);
              this.router.navigate(['user/dashboard']);
        }, err  => {
              console.log(err);
              if (err.error = 'Unauthorized') {
                  alert('password o nome sbagliati');
              } else {
                  alert('Errore');
              }
              this.router.navigate(['auth/user/login']);
    });
  }

    checkIfLoggedIn() {
            try {
                  const token = localStorage.getItem('jwtToken');
                  // decode the token to get its payload
                  const tokenPayload = decode(token);
                  if (!this.auth.isAuthenticated() || tokenPayload.role !== 'user') {
                        console.log('not auth or not of type user');
                        this.router.navigate(['auth/user/login']);
                  } else {
                    this.router.navigate(['user/dashboard']);
                  }
            } catch (e) {
                  console.log('errore check login ' + e);
            }
      }


  }



