import { selectAllContacts } from './../../../store/user/user.selector';
import { setContacts } from './../../../store/user/user.action';
import { UsersState } from './../../../store/user/user.reducer';
import { ContactService } from './../../../services/contact.service';
import { LoadAllConversations, AddConversation } from './../../../store/conversation/conversation.action';
import { selectAllConversations } from './../../../store/conversation/conversation.selector';
import { Store } from '@ngrx/store';
import { MessengerServiceService } from './../../../services/messenger-service.service';
import { Conversation } from './../../../models/Conversation';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts : User[] |null | undefined;
  @Output() onClickContact : EventEmitter<Conversation> = new EventEmitter<Conversation>();
  constructor(private UserService: UserService, private msgSer : MessengerServiceService, private store : Store) { }

  ngOnInit(): void {
    this.store.select(selectAllContacts).subscribe((contacts : any)=>{
      console.log("Selecting contact ",contacts)
      if(contacts){
        this.contacts = contacts
      }

    })
    this.UserService.getContacts().then((users)=>{
      console.log("User Contact",users)
      if(users){
        console.log("Dispatching users...")
        this.store.dispatch(setContacts({users}))
      }

    })

  }
  onClick(u:User){
    this.msgSer.startConversation(u).subscribe((c)=>{
      console.log("Start C")
      if(c.ok && c.body){
        this.store.dispatch(AddConversation({conversation: c.body}));
        this.onClickContact.emit(c.body);
      }
    })

  }

}
