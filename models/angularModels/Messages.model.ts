
export class Conversation {
  _id: string;
  partecipants: [any];
  messages: [Message];
  lastMessage: string;
  timestamp: number;

  constructor(partecipants: [string], messages: [Message]) {
      this.partecipants = partecipants;
      this.messages = messages;
  }
}

export class Message {
    _id: string;
    chat_id: string;
    username: string;
    date: Date;
    msg: string;
    partecipants: [any];

    constructor(username: string, date: Date, msg: string) {
      this.username = username;
      this.date = date;
      this.msg = msg;
    }
}

// export class Conversation {
//   chatID: string;
//   message = [Message];

  // constructor(chatID: string, username: string, date: string, msg: string) {
  //   this.chatID = chatID;
  //   this.message.username = username;
  //   this.message.date = date;
  //   this.message.msg = msg;
  // }
  // }
