import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserStatus, UserStatusService } from 'src/app/services/user-status.service';

@Component({
  selector: 'app-user-status-circle',
  templateUrl: './user-status-circle.component.html',
  styleUrls: ['./user-status-circle.component.scss']
})
export class UserStatusCircleComponent implements OnInit {
  @Input("user") user! : User;
  @Input("size") size : number = 12;
  state! : UserStatus
  s : Subscription | undefined;
  constructor(private userStatusService : UserStatusService) { }

  ngOnInit(): void {
    this.update()
  }
  update(){
    if(this.s)
      this.s.unsubscribe()
    this.s = this.userStatusService.getStatus(this.user!).subscribe((status)=>{
      if(status.lastOnline !== undefined && status.online !== undefined){
        this.state = status
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.update()
  }

}
