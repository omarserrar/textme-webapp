import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "";
  errorMessage : string | undefined;
  password = "";
  register : boolean = true;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  onRegisterGuest(){

  }
  onRegister(){

  }

  switchForm(s : boolean){
    this.register = s;
  }
}
