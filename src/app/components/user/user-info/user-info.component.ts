import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user! : User;
  @Output("onEditUser") onEditUser : EventEmitter<any> = new EventEmitter();
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUser().then((u)=>{
      if(u)
        this.user = u;
    })
  }
  editUser(){
    this.onEditUser.emit()
  }

}
