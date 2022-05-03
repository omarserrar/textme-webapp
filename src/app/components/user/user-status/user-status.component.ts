import { UserStatus } from './../../../services/user-status.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserStatusService } from 'src/app/services/user-status.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {
  @Input("user") user! : User;
  state! : UserStatus
  constructor(private userStatusService : UserStatusService) { }

  ngOnInit(): void {

  }

}
