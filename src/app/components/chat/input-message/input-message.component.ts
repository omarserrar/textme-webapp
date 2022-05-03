import { MessengerServiceService } from './../../../services/messenger-service.service';
import { Message } from './../../../models/Message';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.scss']
})
export class InputMessageComponent implements OnInit {
  @Output("message") onSendMessage : EventEmitter<string> = new EventEmitter<string>();
  @Output("file") onSendFile : EventEmitter<FormData> = new EventEmitter<FormData>();
  message : string = "";
  constructor(private msgService : MessengerServiceService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("Emit "+this.message)
    this.onSendMessage.emit(this.message);
  }
  selectFile(){
    document.getElementById("send-img")?.click();
  }
  upload(e : any){
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file)
    this.onSendFile.emit(formData)
  }
}
