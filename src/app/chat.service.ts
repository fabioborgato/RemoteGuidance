import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import decode from 'jwt-decode';
import { Message, Conversation } from '../../models/angularModels/Messages.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '../../node_modules/@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  conversation: Conversation;
  private messageSource = new BehaviorSubject(this.conversation);
  currentMessage = this.messageSource.asObservable();

    mess: Message;
    token = localStorage.getItem('jwtToken');
    tokenPayload = decode(this.token);
    httpOptions;

    constructor(private socket: Socket, private http: HttpClient, private router: Router) {
      this.readHttpHeader();
    }

    // USER

    getConversationsUser() {
      console.log(this.httpOptions.Authorization);
      try {
        console.log('GET USER CONVERSATION HTTP');
        return this.http.get('http://localhost:3000/user/conversations', this.httpOptions)
        .map( data => {
          return data;
        });
      } catch (e) {
        console.log(e);
      }
    }

    getMessageUser() {
      try {
        return this.socket
        .fromEvent('messageToUser')
        .map( data => {
            return <Message>data;
        });
      } catch (e) {
        console.log(e);
      }
    }

    startSupport(msg, idAdmin?) {
      const today = new Date();
      // tslint:disable-next-line:max-line-length
      // const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' - '  + today.getHours() + ':' + today.getMinutes();

      try {
            const message = new Message(this.tokenPayload.username, today, msg);
            // tslint:disable-next-line:max-line-length
            this.socket.emit('startSupport', {message , 'idAdmin': idAdmin, 'idUser': this.tokenPayload._id });
      } catch (e) {
            console.log('error in startSupport emit');
            console.log(e);
      }
    }


  sendMessageToAdmin(msg: string, idChat: string) {
    const today = new Date();
    try {
          const m = new Message(this.tokenPayload.username, today, msg);
          // tslint:disable-next-line:max-line-length
          this.socket.emit('messageToAdmin', {m, idChat});
    } catch (e) {
          console.log('error in startSupport emit');
          console.log(e);
    }
  }


    // ADMIN

  getConversations() {
    try {
      return this.http.get('http://localhost:3000/admin/conversations')
      .map( data => {
        console.log('GET CONVERSATION HTTP');
        console.log(<Conversation[]>data);
        return <Conversation[]>data;
      });
    } catch (e) {
      console.log(e);
    }
  }


  getStartSupport() {
      try {
        return this.socket
        .fromEvent('startSupport')
        .map( data => {
            return <Conversation>data;
        });
      } catch (e) {
        console.log(e);
      }
  }
// IN TEST -----
  getWaitForSupport() {
    try {
      return this.socket
      .fromEvent('waitForSupport');
    } catch (e) {
      console.log(e);
    }
}
// ------
   getMessageAdmin() {
      try {
        return this.socket
        .fromEvent('messageToAdmin')
        .map( data => {
            return <Message>data;
        });
      } catch (e) {
        console.log(e);
      }
  }

  sendMessageToUser(msg: string, idChat: string) {
      const today = new Date();
      try {
            const m = new Message(this.tokenPayload.username, today, msg);
            this.socket.emit('messageToUser', {m, idChat});
      } catch (e) {
        console.log(e);
  }}

  // PASS DATA
  changeMessage(message: Conversation) {
    this.messageSource.next(message);
  }


readHttpHeader () {
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


