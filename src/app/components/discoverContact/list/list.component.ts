import { selectAllOther } from './../../../store/user/user.selector';

import { Store } from '@ngrx/store';
import { ContactService } from './../../../services/contact.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { setDiscover } from 'src/app/store/user/user.action';
import { UsersState } from 'src/app/store/user/user.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  contacts : User[] | undefined | null;
  constructor(private UserService : UserService, private store : Store) { }

  ngOnInit(): void {
    this.store.select(selectAllOther).subscribe((users : any)=>{
      if(users)
        this.contacts = users
    })
    this.UserService.discover()?.subscribe((users)=>{
      if(users){
        console.log("Dispatching other ",users)
        this.store.dispatch(setDiscover({users}))
      }

    })
  }

}
