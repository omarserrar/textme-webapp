import { UserStatusService } from './../../../services/user-status.service';
import { User } from './../../../models/User';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {
  @Input("user") user! : User;


  constructor() { }

  ngOnInit(): void {

  }


}
