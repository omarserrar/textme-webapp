import { selectUser } from './../../../store/user/user.selector';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from './../../../services/auth.service';
import { Conversation } from './../../../models/Conversation';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/User';
import { formatDate } from 'src/app/utils/DateFormat';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'app-conversation-element',
  templateUrl: './conversation-element.component.html',
  styleUrls: ['./conversation-element.component.scss']
})
export class ConversationElementComponent implements OnInit {
  @Input("conversation") conversation? : Conversation | null;
  user? : User | null;
  lastMessage! : Message;
  constructor(private us : UserService, private store : Store) { }

  ngOnInit(): void {
    console.log("init")
    this.us.getUser().then((u) => {
      if(u && this.conversation?.user1){
        let user = this.conversation?.user1.id == u.id? this.conversation?.user2 : this.conversation?.user1;
        if(user && user.id)
          this.store.select(selectUser(user.id)).subscribe((u)=>this.user=u)
        if(this.conversation.messages.length > 0)
          this.lastMessage = this.conversation.messages[this.conversation.messages.length-1];
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.conversation?.id + " Changed")
    if(this.conversation && this.conversation.messages.length > 0)
          this.lastMessage = this.conversation.messages[this.conversation.messages.length-1];
  }

}
