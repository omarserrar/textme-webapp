import { User } from "./User";

export interface Message{
  id : number | undefined,
  sender : User,
  textContent : string,
  sentDate : Date,
  image : {
    id : number,
    type: string
  }
  seen : Date
}
