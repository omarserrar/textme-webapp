import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-guest-form',
  templateUrl: './register-guest-form.component.html',
  styleUrls: ['./register-guest-form.component.scss']
})
export class RegisterGuestFormComponent implements OnInit {
  errorMessage : string = ""

  user : User = {id:-1, username:"", firstName:"", lastName:"", guest: true}
  registerForm ?: FormGroup;
  constructor(private authService : AuthService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.registerForm =  this.fb.group({
      lastname: [this.user.lastName, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      firstname: [this.user.firstName, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
   })
  }
  async onRegisterGuest(){
    this.errorMessage=""
    if(this.registerForm?.valid){
      try{
        let r = await this.authService.register(this.user)

      }
      catch (e:any){
        console.log("Err ",e)
        if(e && e.error && e.error.message){
          this.errorMessage = e.error.message
        }
        this.errorMessage = "Cannot register now"
      }
    }
  }
}
