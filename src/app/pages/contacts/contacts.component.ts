import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts : User[] |null | undefined;
  user : User | undefined |null;
  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    this.UserService.getCurrentUser().toPromise().then((u)=>{
      console.log("User",u)
      this.user = u;
    })

  }

}
