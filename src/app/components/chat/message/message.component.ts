import { Conversation } from './../../../models/Conversation';
import { getImage } from './../../../enums/ApiPaths';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Output("OnMessageDisplay") onMessageDisplay : EventEmitter<void> = new EventEmitter();
  @Input("message") message! : Message;
  @Input("seen") user : User | undefined;
  sentByUser : boolean = false;
  imageUrl : string | undefined;
  @Input("conversation") conversation! : Conversation
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    if(this.message.image && this.message.id){
      this.imageUrl = getImage(this.message.image.id);
    }
    this.userService.getUser().then((u) =>{
      if(u)
        this.sentByUser = (u.id ==this.message.sender.id);
      this.onMessageDisplay.emit();
    })
  }

}
