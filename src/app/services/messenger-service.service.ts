import { User } from './../models/User';
import { NotificationsService } from './notifications.service';
import { CONVERSATION, sendImage, START_CONVERSATION, setSeen } from './../enums/ApiPaths';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from '../models/Conversation';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessengerServiceService {


  constructor(private http : HttpClient, private nts : NotificationsService) { }

  getConversations() : Observable<HttpResponse< Conversation[]>>{
    return this.http.get<Conversation[]>(CONVERSATION, { observe: 'response' });
  }
  sendMessage(message : String, c : Conversation) : Observable<HttpResponse< Message>> {
    let URL = `${CONVERSATION}/${c.id}`
    return this.http.post<Message>(URL, {message},{ observe: 'response' });
  }
  sendFile(formData : FormData, c : Conversation) : Observable<HttpResponse< Message>> {
    return this.http.post<Message>(sendImage(c.id), formData, { observe: 'response', reportProgress: true })

  }
  startConversation(user : User) : Observable<HttpResponse< Conversation>>{
    return this.http.get<Conversation>(START_CONVERSATION+`/${user.id}`, { observe: 'response' });
  }
  setMessageSeen(c : Conversation) : Observable<HttpResponse< any>> {
    return this.http.post<any>(setSeen(c.id), {},{ observe: 'response' });
  }
}
