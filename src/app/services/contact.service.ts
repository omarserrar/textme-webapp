import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // private contacts! : User[];
  // private discover! : User[];

  // constructor(private userService : UserService) { }

  // deleteContact(c : User){
  //   const index = this.contacts.findIndex((u)=>(u.id == c.id))
  //   if (index > -1) {
  //     this.contacts.splice(index, 1);
  //     this.discover.push(c)
  //   }

  // }
  // addContact(c : User){
  //   const index = this.discover.findIndex((u)=>(u.id == c.id))
  //   if (index > -1) {
  //     this.discover.splice(index, 1);
  //     this.contacts.push(c)
  //   }
  // }
  // async getContact(){
  //   let d = await this.userService.getContacts();
  //   if(d)
  //     this.contacts = d
  //   return this.contacts
  // }
  // async getDiscover(){
  //   let d = await this.userService.discover()?.toPromise();
  //   if(d)
  //     this.discover = d
  //   return this.discover
  // }
}
