import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {
  @Input("control") control? : ValidationErrors | null;
  @Input("name") fieldName : string = '';
  error? : string;
  constructor() { }

  ngOnInit(): void {
    this.error = this.getError();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Here")
    this.error = this.getError();
  }
  getError() : string | undefined{
    let errors = this.control
    if(errors){
     console.log(errors)
     if(errors['required']){
       return this.fieldName + ' is required !'
     }
     else if(errors['email']){
       return 'Please enter a valid email !'
     }
     else if(errors['minlength']){
      let minLength = errors['minlength'].requiredLength;
      return this.fieldName+" must be at least "+minLength+" characters";
    }
    else if(errors['maxlength']){
      let max = errors['maxlength'].requiredLength;
      return this.fieldName+" must be less than "+max+" characters";
    }
     else{
      return 'Unkown error!'
     }
    }
    return ;
   }
}
