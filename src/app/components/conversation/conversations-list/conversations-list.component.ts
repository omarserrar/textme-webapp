import { selectAllConversations } from './../../../store/conversation/conversation.selector';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { Conversation } from './../../../models/Conversation';
import { MessengerServiceService } from './../../../services/messenger-service.service';
import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {
  conversations! : Conversation[] | null;
  @Output() onClickContact : EventEmitter<Conversation> = new EventEmitter<Conversation>();
  constructor(private ms : MessengerServiceService, private userService : UserService, private store : Store) { }

  ngOnInit(): void {
    let sub = this.store.select(selectAllConversations).subscribe((c) => {
      console.log("Selecting...")
      if(c.status == "SUCCESS")
        console.log("New conversations")
      if(!this.conversations){
        this.conversations = c.conversations;
      }
      else {
        this.conversations.forEach((c, i)=>{
          let unread : number = 0;
          if(c.messages)
          c.messages.forEach((m)=>{
            if(this.conversations && this.conversations[i] && m.sender.id == this.userService.user?.id && m.seen){
              this.conversations[i].lastMessageSeen = m;
            }
            if(this.conversations && this.conversations[i] && m.sender.id != this.userService.user?.id && !m.seen){
              this.conversations[i].unread = (++unread);
            }
          })
        })
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Conversation changed")
  }
  async onClick(c : Conversation){
    let u = await this.userService.getUser();
    u = (c.user1?.id == u?.id)? c.user2 : c.user1;
    this.onClickContact.emit(c);
  }

}
