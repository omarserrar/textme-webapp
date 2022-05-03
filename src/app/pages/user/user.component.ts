import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user : User | undefined | null;
  constructor(private UserService : UserService) { }

  ngOnInit(): void {
    this.UserService.getCurrentUser().subscribe(res=>{
      this.user = res;
    })
  }

}
