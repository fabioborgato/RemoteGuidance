import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginData = { username: '', password: '' };
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router, public auth: AuthService) { }

  ngOnInit() {
       this.checkIfLoggedIn();
  }

  login() {
            this.http.post('http://localhost:3000/auth/admin/login', this.loginData).subscribe(resp => {
              this.data = resp;
              console.log(this.data);
              localStorage.setItem('jwtToken', this.data.token);
              this.router.navigate(['admin/interventi']);
        }, err  => {
              console.log(err);
              if (err.error = 'Unauthorized') {
                  alert('password o nome sbagliati');
              } else {
                  alert('Errore');
              }
              this.router.navigate(['auth/admin/login']);
            });
    }

    checkIfLoggedIn() {
            try {
              const token = localStorage.getItem('jwtToken');
              if (token) {
                    const tokenPayload = decode(token);
                    if (!this.auth.isAuthenticated() || tokenPayload.role !== 'admin') {
                          this.router.navigate(['auth/admin/login']);
                      return false;
                    }
                    this.router.navigate(['admin/interventi']);
                    return true;
              } else {
                      this.router.navigate(['auth/admin/login']);
                }
            } catch (e) {
              console.log(e);
              this.router.navigate(['auth/admin/login']);
            }

    }


  }
