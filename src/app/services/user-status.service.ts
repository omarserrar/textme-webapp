import { BehaviorSubject, Subject } from 'rxjs';
import { selectAll } from './../store/user/user.selector';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UserStatusService {
  status : UserStatus[] = [];
  statusSub : UserStatusSubject[] = [];
  constructor(private Store : Store) {

    this.Store.select(selectAll).subscribe((users)=>{
      users.forEach((u)=>{
        console.log("Updating user state")
        this.setUserStatus(u);
      })
    })
    setInterval(this.updateAll.bind(this), 5000)
  }
  getStatus(user: User) : Subject<UserStatus>{
    let s = this.statusSub.find((ss)=>ss.userid==user.id)
    if(!s){
      s = {userid: user.id!, subject: new BehaviorSubject({})}
      this.statusSub.push(s)
    }
    return s.subject
  }
  getUserStatus(lastOnline?: string, online?: boolean) : UserStatus{
    let lastOnlineStr = ""
    let isOnline : boolean = false;
    if(lastOnline){
      let lastOnlineDate  = Date.parse(lastOnline)
      let lastOnlineDay = Math.floor((new Date().getTime() - lastOnlineDate)/(1000*60*60*24))
      let lastOnlineHour = Math.floor((new Date().getTime() - lastOnlineDate)/(1000*60*60))
      let lastOnlineMinute = Math.floor((new Date().getTime() - lastOnlineDate)/(1000*60))
      //console.log("Min "+this.lastOnlineMinute)
      if(lastOnlineDay){
        lastOnlineStr = `Active ${lastOnlineDay} day(s) ago`
      }
      else if(lastOnlineHour){
        lastOnlineStr = `Active ${lastOnlineHour} h ago`
      }
      else{
        if(online && lastOnlineMinute <= 30){
          isOnline = true
          lastOnlineStr = `Active now`
        }
        else{
          lastOnlineStr = `Active ${lastOnlineMinute} min ago`
        }
      }
      return {online: isOnline, lastOnline: lastOnlineStr, lastOnlineDate: lastOnline, lastOnlineDay, lastOnlineHour,lastOnlineMinute}
    }
    return {online: false, lastOnline: ""}
  }
  updateAll(){

    this.status.forEach((s, i)=>{
      let oldLastOnline = s.lastOnline
      let state = this.getUserStatus(s.lastOnlineDate, s.online);
      this.status[i] = {... state, userid: s.userid}
      let newLastOnline = this.status[i].lastOnline
      if(oldLastOnline != newLastOnline)
        this.alertUser(this.status[i])
    })
  }
  alertUser(state : UserStatus){
    let s = this.statusSub.find((ss)=>ss.userid==state.userid)

    if(s)
      s.subject.next(state)
    else{
      s = {userid: state.userid!, subject: new BehaviorSubject ({})}
      this.statusSub.push(s)
      console.log("Alerting ",s)
      s.subject.next(state)
    }

  }
  setUserStatus(u : User){
    let ustate = this.status.find((us)=>us.userid == u.id)
    console.log("Setting ",ustate)
    let state = this.getUserStatus(u.lastOnline, u.online);

    if(ustate){
      ustate = {...state, userid: ustate.userid}
      console.log("New state ",ustate)
      this.alertUser(ustate)
    }
    else{
      ustate = {...state, userid: u.id}
      console.log("Set statut ",ustate)
      this.alertUser(ustate)
      this.status.push(ustate)

    }

  }

}
export interface UserStatus{
  userid?: number,
  online?: boolean,
  lastOnline?: string,
  lastOnlineDate?: string,
  lastOnlineDay? : number,
  lastOnlineHour? : number,
  lastOnlineMinute? : number,
}
interface UserStatusSubject{
  userid: number,
  subject: BehaviorSubject<UserStatus>
}
