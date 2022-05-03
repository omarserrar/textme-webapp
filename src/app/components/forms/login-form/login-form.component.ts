import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  errorMessage : string = ""
  password: string = ""
  username : string = ""
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  onLogin(){
    console.log(this.username+" "+this.password)
    this.authService.login(this.username, this.password).subscribe(res =>{
      if(res.error && res.message){
        this.errorMessage = res.message;
      }
    })
  }
}
