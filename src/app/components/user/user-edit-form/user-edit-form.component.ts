import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit {
  userForm ?: FormGroup;
  user! : User;
  newUser! : User;
  errorMessage : string = ""
  success : boolean = false;
  @Output("onExit") onExit : EventEmitter<any> = new EventEmitter();

  constructor(private fb : FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUser().then((u)=>{
      if(u){
        this.user = u;
        this.newUser = {...u};
        this.userForm =  this.fb.group({
          username: [u.username, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
          firstname: [u.firstName, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
          lastname: [u.lastName, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
          phone: [u.phone,[Validators.email]],
          email: [u.email, [Validators.email]],
        })
      }
    })

  }
  getErrorIfTouched(field : string){
    if(this.userForm!.controls[field] && this.userForm!.controls[field].touched){
      return this.userForm!.controls[field].errors
    }
    return;
  }
  getError(field : string){
    if(this.userForm!.controls[field]){
      return this.userForm!.controls[field].errors
    }
    return;
  }
  onSave(){
    this.success = false
    if(this.userForm?.valid){
      console.log(this.newUser);
    this.userService.editProfile(this.newUser).then((a)=>{
      this.errorMessage="";
      this.success = true
    }).catch((r)=>{
      this.errorMessage=r.error.message
      console.log(r)
    });
    }
    else{
      console.log("not valid")
    }

  }
  return(){
    this.onExit.emit();
  }
}
