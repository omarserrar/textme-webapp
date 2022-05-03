import { Message } from "./Message";
import { User } from "./User";

export interface Conversation{
  id : number,
  user1 : User,
  user2: User,
  messages : Message[],
  unread : number,
  lastMessageSeen: Message,
}
