import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, public auth: AuthService) { }

  signupData = { username: '', email: '', password: '' };
  passwordRepeat = '';
  data: any;

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  signup() {
    if (this.passwordRepeat !== this.signupData.password) {
                return alert('password non corrispondenti');
    } else {
                this.http.post('http://localhost:3000/auth/user/register', this.signupData).subscribe(resp => {
                    this.data = resp;
                    // console.log(this.data);
                    localStorage.setItem('jwtToken', this.data.token);
                    localStorage.setItem('userID', this.data.userID);
                    this.router.navigate(['auth/user/complete-registration']);
              }, err  => {
                    switch (err) {
                      case 'MissingPasswordError':
                            alert('Insert a password');
                            break;
                      case 'UserExistsError':
                            alert('A user with this name already exist');
                            break;
                      default:
                            alert('error');
                    }
                     console.log(err);
                    // alert(err.message);
                    this.router.navigate(['auth/user/register']);
              });
    }
  }

  checkIfLoggedIn() {
    const token = localStorage.getItem('jwtToken');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (!this.auth.isAuthenticated() || tokenPayload.role !== 'user') {
          this.router.navigate(['auth/user/register']);
      return false;
    } else {
          this.router.navigate(['user/dashboard']);
    }
}


}
