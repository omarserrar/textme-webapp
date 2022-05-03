import { NotificationsService } from './../../services/notifications.service';
import { LoadAllConversations, SetSeen } from './../../store/conversation/conversation.action';
import { Store } from '@ngrx/store';
import { MessengerServiceService } from './../../services/messenger-service.service';
import { Conversation } from './../../models/Conversation';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user? : User | null;
  conversation! : Conversation ;
  edit : boolean = false;
  constructor(private userService : UserService, private msg : MessengerServiceService, private store :Store, private nts : NotificationsService) { }

  ngOnInit(): void {
    this.refreshUser()
    this.store.dispatch(LoadAllConversations());
    this.nts.messageListener.subscribe((e)=>{
      console.log("New Msg Dispatching...")
      this.store.dispatch(LoadAllConversations());
    })
    this.nts.seenListener.subscribe((e)=>{
      console.log("New Seen Dispatching...", e)
      this.store.dispatch(SetSeen({mid: e.mid, cid: e.cid}));
    })
  }
  refreshUser(){
    this.userService.getCurrentUser().subscribe(res=>{
      this.user = res;
    })
  }
  showContact(conversation : Conversation){
    this.conversation = conversation;
  }
  enableEdit(){
    console.log("Enable edit")
    this.edit = true;
  }
  disableEdit(){
    this.edit = false;
  }
}
