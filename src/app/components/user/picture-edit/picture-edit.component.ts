import { UserService } from 'src/app/services/user.service';
import { User } from './../../../models/User';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-picture-edit',
  templateUrl: './picture-edit.component.html',
  styleUrls: ['./picture-edit.component.scss']
})
export class PictureEditComponent implements OnInit {
  @Input("user") user! : User;
  hover : boolean = false;
  uploading : boolean = false;
  constructor(private userService : UserService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  hoverPicture(state : boolean){
    if(!this.uploading)
      this.hover = state;
  }
  upload(event : any){
    let file = event.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append("file", file)
      this.userService.uploadProfilePicture(formData).subscribe((e)=>{
        if (e.type == HttpEventType.UploadProgress) {
          this.uploading = true;
        }
        else if(e.type == HttpEventType.Response){
          this.uploading = false;
        }
      })
    }
  }
  selectImage(){
    let input = document.getElementById('upload-img');
    if(input)
      input.click();
  }
}
