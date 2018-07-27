import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { ConnectedAdmin } from '../../onlineAdmins.model';
import { Conversation } from '../../../../models/angularModels/Messages.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { OnlineService } from '../../online.service';

@Component({
  selector: 'app-opchat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatOperatorComponent implements OnInit {

  constructor(private chat: ChatService, private http: HttpClient, private router: Router, private online: OnlineService) { }

  message: string;
  connectedAdmins: ConnectedAdmin[] = [];
  conversations: Conversation[] = [];
  isChat: Boolean = false;
  userInfo;
  chats;
  httpOptions;

  ngOnInit() {

    // READ JWT TOKEN
    this.readToken();

    // ONLINE ADMIN

    this.online.getOnlineAdminHttp().subscribe((data) => {
      this.connectedAdmins = data;
  });
    this.online.getOnlineAdmins().subscribe((data) => {
        this.connectedAdmins = data;
    });

    // CHAT
    this.chat.getWaitForSupport().subscribe(() => {
      console.log('get waitForSupport');
    });


    this.chat.getConversationsUser().subscribe((data) => {
        // this.conversations = data;
        // this.nChat = data.length;
        this.chats = data;
        this.chats.forEach(conversation => {

              console.log(conversation);
              const d = conversation.date;
              // tslint:disable-next-line:max-line-length
              // const date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' - '  + d.getHours() + ':' + d.getMinutes();

              // last message
              const x = conversation.messages.length;
              conversation.lastMessage = conversation.messages[x - 1].msg;
              this.isChat = true;
        });
    });

    this.chat.getMessageUser().subscribe((data) => {
      let i = 0;
      console.log('chats');
      console.log(this.chats);
      this.chats.forEach(conversation => {

        console.log(conversation);
        // tslint:disable-next-line:triple-equals
        if (conversation.idChat == data.idChat) {
            conversation.lastMessage = data.msg;
            this.chats[i].messages.push(data.message);
        } else {
          console.log(data);
          console.log('not founf');
        }
        i++;
  });
    });

  }

onTapped(event, index) {
  console.log(this.chats[index]);
 // console.log(this.conversations[index]);
  this.chat.changeMessage(this.chats[index]);
  this.router.navigate(['user/chatmobile']);
}

  readToken () {
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
