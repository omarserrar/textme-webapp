import { updateUser } from './../store/user/user.action';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _userJwt : string | undefined;
  get userJwt(){
    return this._userJwt;
  }
  public client! : Client;
  public seenListener : Subject<any> = new Subject();
  public messageListener : Subject<any> = new Subject();
  constructor(private Store : Store) {

  }
  initSocketService(userJWT : string){
    this._userJwt = userJWT;
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/stomp',
      connectHeaders: {
        jwt: userJWT
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: this.startListening.bind(this),

    });
    this.client.onStompError = function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    this.client.activate()
  }

  sendMessage(body: string, destination: string){

    if(this.client.connected){
      this.client.publish({ destination, body })
    }
  }
  startListening(frame : any){
    this.client.publish({
      destination: "/app/typing",
      body: "1",
      skipContentLengthHeader: true,

    });
    console.log("connected ", this.client)
    this.client.subscribe("/user/topic/notification/seen", (m)=>{
      console.log("new seen")
      this.seenListener.next(JSON.parse(m.body))
    })
    this.client.subscribe("/user/topic/notification/message", (m)=>{
      console.log("new ")
      this.messageListener.next(JSON.parse(m.body))
    })
    this.client.subscribe("/user/topic/update", (m)=>{
      console.log("new update ",m)
      //this.messageListener.next(JSON.parse(m.body))
    })
    this.client.subscribe("/topic/update", (m)=>{
      console.log("new update ",JSON.parse(m.body))
      let b = JSON.parse(m.body);
      if(b && b.u)
        this.Store.dispatch(updateUser({user: b.u}))
    })
  }

  // listen(topic: string) : Observable<string>{

  //   return new Observable<string>((observer) => {
  //     if(!this.client.connected){
  //       this.connect();
  //       this.client.onConnect = (frame)=>this.client.subscribe("/user"+topic, (msg)=>observer.next(msg.body));
  //     }
  //     else this.client.subscribe("/user"+topic, (msg)=>observer.next(msg.body));
  //     return {
  //       unsubscribe() {
  //       }
  //     };
  //   });
  //}
}
