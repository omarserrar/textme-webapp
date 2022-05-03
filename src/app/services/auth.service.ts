import { REGISTER_PATH, USER_PATH } from './../enums/ApiPaths';
import { LoginResponse } from './../models/responses/LoginResponse';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay } from 'rxjs';
import { User } from '../models/User';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userJwt : string |null = '';
  auth : boolean = false;
  LOGIN_PATH = "http://localhost:8080/api/auth/login";
  constructor(private http : HttpClient, protected nts : NotificationsService) { }

  refresh(){
      let jwt =  localStorage.getItem('jwt');
      if(jwt){
        this.auth = true;
        this.userJwt = jwt;
        if(!this.nts.client || this.nts.userJwt != this.userJwt){
          console.log("Init new session")
          this.nts.initSocketService(jwt);
        }

      }
  }
  isAuth(): boolean{
    this.refresh();
    return this.auth;
  }
  login(username : any, password : any ) : Observable<LoginResponse>{
    let postRequest = this.http.post<LoginResponse>(this.LOGIN_PATH, {username, password}).pipe(
      map((res) => res),
      shareReplay()
    );
    postRequest.subscribe(res=>{
      if(!res.error && res.jwt){
        console.log(res.jwt)
        this.userJwt = res.jwt
        this.auth = true;
        localStorage.setItem('jwt', res.jwt);
      }
    })
    return postRequest;
  }
  async register(user: User): Promise<any | null | undefined>{
    try{
      let postRequest = await this.http.post<any>(REGISTER_PATH, user, {observe: 'response'}).toPromise();
      if(postRequest?.ok){
        if(postRequest.body?.jwt) {
          console.log(postRequest.body?.jwt)
          this.userJwt = postRequest.body?.jwt
          this.auth = true;
          localStorage.setItem('jwt', postRequest.body?.jwt);
        }
      }
      return postRequest;
    }
    catch(e){
      throw e
    }


  }

}
