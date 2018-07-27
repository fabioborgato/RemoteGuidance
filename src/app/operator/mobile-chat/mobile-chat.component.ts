import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Conversation } from 'models/angularModels/Messages.model';
import { Router } from '@angular/router';
import { Message } from '../../../../models/angularModels/Messages.model';
import decode from 'jwt-decode';


@Component({
  selector: 'app-op-mobile-chat',
  templateUrl: './mobile-chat.component.html',
  styleUrls: ['./mobile-chat.component.css']
})
export class MobileChatOpComponent implements OnInit {

  message: Conversation;
  msg: '';
  myUsername: '';
  tokenPayload;

  constructor(private chat: ChatService, private router: Router) { }

  ngOnInit() {
      this.readToken();
      this.chat.currentMessage.subscribe(message => {
            if (message === undefined) {
              this.router.navigate(['/user/chat']);
              console.log(message);
            } else {
              this.message = message;
            }
      });

      this.chat.getMessageUser().subscribe((data) => {
      console.log('GET MESSAGE ADMIN');
      console.log(data);
        this.message.messages.push(data);
    });
  }


  send() {
     try {
        // tslint:disable-next-line:triple-equals
        if (this.msg != '') {
            console.log(this.msg);
            const today = new Date();
            const message = new Message(this.tokenPayload.username, today, this.msg);
            this.chat.sendMessageToAdmin(this.msg, this.message._id);
            this.message.messages.push(message);
            this.msg = '';
        } else {
          alert('Text cannot be empty');
        }
    } catch (e) {
        console.log('error ' + e);
    }
  }

  back() {
    this.router.navigate(['/user/chat']);
  }

  readToken () {
    try {
          const token = localStorage.getItem('jwtToken');
          this.tokenPayload = decode(token);
          this.myUsername = this.tokenPayload.username;
    } catch (e) {
          this.router.navigate(['/auth/admin/login']);
          console.log('errore lettura token' + e);
    }
  }

}
