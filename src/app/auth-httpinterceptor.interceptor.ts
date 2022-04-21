import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHTTPInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if( this.authService.isAuth()&& this.authService.userJwt){
      return next.handle(request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.userJwt}`
        }
      }));
    }
    return next.handle(request)
  }
}
