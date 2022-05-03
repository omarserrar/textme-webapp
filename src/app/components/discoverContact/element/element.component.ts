import { setDiscover, addContact } from './../../../store/user/user.action';
import { Store } from '@ngrx/store';
import { ContactService } from './../../../services/contact.service';
import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
  @Input("user") user : User | undefined | null;
  added : boolean = false;
  constructor(private UserService : UserService, private store : Store) { }

  ngOnInit(): void {
  }

  addUser(){
    if(this.user)
      this.UserService.addUser(this.user).subscribe((res) => {
        if(res.status == 204){
          this.added = true;
          this.store.dispatch(addContact({user: this.user!}))
        }
      });
  }
}
