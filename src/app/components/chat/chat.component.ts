import { LoadAllConversations, AddMessage } from './../../store/conversation/conversation.action';
import { selectConversation, selectAllConversations } from './../../store/conversation/conversation.selector';
import { Store } from '@ngrx/store';
import { MessengerServiceService } from './../../services/messenger-service.service';
import { UserService } from 'src/app/services/user.service';
import { Conversation } from './../../models/Conversation';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user : User | undefined;
  newMessage : number = 0;
  @Input("conversation") conversation : Conversation | undefined;
  @ViewChild('target') private chatZone!: ElementRef ;
  sub : any;
  constructor(private userService : UserService, private ms : MessengerServiceService, private store : Store) { }

ngOnInit(): void {
  if(this.conversation)
    this.conversation.unread = 0
}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.sub)
      this.sub.unsubscribe();
    if(this.conversation)
      this.userService.getUser().then((u) =>{
        if(u)
          this.user = (u.id ==this.conversation?.user1.id) ? this.conversation?.user2 : this.conversation?.user1;
      })
      if(this.conversation && this.conversation.id){
        this.setSeen()
        this.sub = this.store.select(selectConversation(this.conversation?.id)).subscribe((c)=>{
          this.setSeen()
          if(c && c.length == 1)
            this.conversation = c[0];
          else
            this.store.dispatch(LoadAllConversations());
          this.conversation!.unread = 0
        });
      }
      if(this.conversation)
        this.conversation.unread = 0
  }
  onSend(message: string){
    if(this.conversation){
      this.ms.sendMessage(message, this.conversation).subscribe((msg)=>{
        console.log("Sent")
        if(msg.body && this.conversation)
          this.store.dispatch(AddMessage({newmessages : msg.body, cid : this.conversation.id}))
      })
    }

  }
  onSendFile(formData : FormData){
    if(this.conversation)
      this.ms.sendFile(formData, this.conversation ).subscribe((msg)=>{
        if(msg.body && this.conversation)
          this.conversation.messages.push(msg.body)
      })
  }
  scrollDown(){
    console.log("Scroll Down")
    this.chatZone.nativeElement.scrollTop = this.chatZone.nativeElement.scrollHeight;
  }
  setSeen(){
    if(this.conversation)
      this.ms.setMessageSeen(this.conversation).subscribe()
  }
}
