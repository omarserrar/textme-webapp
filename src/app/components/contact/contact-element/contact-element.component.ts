import { Store } from '@ngrx/store';
import { ContactService } from './../../../services/contact.service';
import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { deleteContact } from 'src/app/store/user/user.action';

@Component({
  selector: 'app-contact-element',
  templateUrl: './contact-element.component.html',
  styleUrls: ['./contact-element.component.scss']
})
export class ContactElementComponent implements OnInit {
  @Input("user") user : User | undefined;
  deleted : boolean = false;
  constructor(private userService : UserService, private contactService: ContactService, private store: Store) { }

  ngOnInit(): void {
  }

  delete(){
    if(this.user)
    this.userService.deleteUser(this.user).subscribe((r)=>{
      if(r.status == 204){
        this.deleted = true;

        this.store.dispatch(deleteContact({user: this.user!}))
      }
    })
  }
}
