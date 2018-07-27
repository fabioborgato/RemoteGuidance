import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Intervento } from '../../../../models/angularModels/intervento.model';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-interventi',
  templateUrl: './interventi.component.html',
  styleUrls: ['./interventi.component.css']
})
export class InterventiComponent implements OnInit {

  httpOptions;

  interventi: any;
  nInterventi = 0;

  constructor(private http: HttpClient, private router: Router, private chat: ChatService) { }

  ngOnInit() {
    this.readHttpOptions();
    this.getInterventi();
   // this.chat.joint();

  }

  getInterventi() {
    try {
      this.http.get('http://localhost:3000/admin/interventi', this.httpOptions).subscribe(data => {
        this.interventi = data;
        this.nInterventi = this.interventi.length;
      }, err => {
        if (err.status === 401) {
          this.router.navigate(['auth/admin/login']);
        }
        console.log(err);
      });
    } catch (e) {
      console.log('errore getInterventi' + e);
    }
  }

  onTapped(event, index) {
      console.log(event, index);
      // this.router.navigate(['']);
  }

  onAddIntervento() {
      this.router.navigate(['admin/addIntervento']);
  }


  readHttpOptions () {
    try {
      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
      };
    } catch (e) {
      this.router.navigate(['/auth/user/login']);
      console.log('errore lettura token' + e);
    }
  }

}
