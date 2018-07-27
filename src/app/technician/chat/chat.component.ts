import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Router } from '@angular/router';
import { Message } from '../../../../models/angularModels/Messages.model';
import { Conversation } from '../../../../models/angularModels/Messages.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnlineService } from '../../online.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chat: ChatService, private router: Router, private http: HttpClient, private online: OnlineService) {}

  message: string;
  conversations: Conversation[] = [];
  nChat = 0;

  ngOnInit() {

          this.chat.getConversations().subscribe((data) => {
              this.conversations = data;
              this.nChat = data.length;
              this.conversations.forEach(conversation => {
                console.log(conversation);
                 const x = conversation.messages.length;
                 conversation.lastMessage = conversation.messages[x - 1].msg;
              });
          });

          this.chat.getStartSupport().subscribe((data) => {
            try {
                  this.conversations.push(data);
                  this.nChat++;
            } catch (e) {
                  console.log(e);
          }});

          this.chat.getMessageAdmin().subscribe((data) => {
                    this.conversations.forEach((element, i) => {
                    // tslint:disable-next-line:triple-equals
                        if (this.conversations[i]._id == data.chat_id) {
                            console.log('found chat');
                            this.conversations[i].messages.push(data);
                        }
                  });
          });

}

onTapped(event, index) {
  console.log(this.conversations[index]);
  this.chat.changeMessage(this.conversations[index]);
  this.router.navigate(['admin/chatmobile']);
}

}
