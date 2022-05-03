import { PICTURE_DOWLOAD } from './../../../enums/ApiPaths';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.scss']
})
export class UserPictureComponent implements OnInit {
  @Input("user") user! : User;
  @Input("size") size : number = 40;
  imgSrc! : string;

  constructor() { }

  ngOnInit(): void {

    console.log("Init picture")
    this.imgSrc = PICTURE_DOWLOAD + "/"+this.user.id;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.imgSrc = PICTURE_DOWLOAD + "/"+this.user.id;
  }

}
