import { CONTACT_PATH, PICTURE_UPLOAD } from './../enums/ApiPaths';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { DISCOVER_CONTACT_PATH, USER_PATH, USER } from '../enums/ApiPaths';
import { finalize, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : User | undefined |null;
  constructor(private authService : AuthService, private http : HttpClient) { }
  getCurrentUser() : Observable<User |null>{
    return this.http.get<User | null>(USER_PATH);
  }
  async getUser() : Promise<User | null | undefined> {
    if(this.user) return this.user;
    this.user = await this.getCurrentUser().toPromise();
    return this.user;
  }
  async getContacts() : Promise<User[] | null>{
    if(this.user && this.user.contacts)
      return this.user?.contacts;
    let user = await this.getCurrentUser().toPromise();
    if(user && user.contacts)
      return user.contacts;
    return null;
  }

  discover() : Observable<User[] | null> | null{
    if(this.authService.isAuth()){
      return this.http.get<User[] | null>(DISCOVER_CONTACT_PATH);
    }
    return null;
  }

  addUser(user: User) : Observable<any> {
    return this.http.post(CONTACT_PATH + "/"+user.id , {}, { observe: 'response' });
  }
  deleteUser(user: User) : Observable<any> {
    return this.http.delete(CONTACT_PATH + "/"+user.id , { observe: 'response' });
  }
  async editProfile(user : User) : Promise<any | null | undefined>{
    let r : HttpResponse<any> | undefined =  await this.http.put<HttpResponse<any>>(USER, {...user}, {observe: "response"}).toPromise();
    if(r?.ok){
      this.user = r.body;
      return {user: this.user!};
    }
    else{
      throw r!.body.message
    }

  }
  uploadProfilePicture(formData : FormData){
    return this.http.post(PICTURE_UPLOAD, formData, { observe: 'events', reportProgress: true })

  }
}

