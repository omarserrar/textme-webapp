import { state } from '@angular/animations';
import { LoadAllConversations, LoadConversation, LoadAllSuccess, AddMessage, SetSeen, AddConversation } from './conversation.action';
import { Conversation } from './../../models/Conversation';
import { Action, createReducer, on } from '@ngrx/store';
import { Message } from 'src/app/models/Message';

export interface State {
  conversations: Conversation[] | null;
  status: "LOADING" | "SUCCESS"
}
export const initialState: State = {
  conversations : [],
  status : "LOADING"
};

export const ConversationReducer = createReducer(
  initialState,
  on(LoadAllConversations, state => ({ ...state, status: "LOADING"})),
  on(LoadConversation, state => ({ ...state, status: "LOADING"})),
  on(LoadAllSuccess, (state, {conversations}) => {
    conversations?.map((c)=>{
      let i = state.conversations!.findIndex((olc)=>olc.id==c.id);
      let oldC = state.conversations![i];
      if(!oldC){
        state.conversations?.push(c)
      }
      else if(oldC?.messages && c&& oldC?.messages.length != c.messages.length){
        console.log("New "+(c.messages.length-oldC?.messages.length)+" Messages")
        state.conversations![i] = {... oldC, messages: c.messages}
      }
    })
    return ({ ...state, status: "SUCCESS"})
  }),
  on(LoadConversation, (state) => {
    return ({ ...state, status: "LOADING"})
  }),
  on(AddConversation, (state, {conversation}) => {
    let cc = state.conversations?.find((c)=>c.id == conversation.id)
    if(!cc){

      state.conversations?.push(conversation)
      console.log("Added Conversation")
    }

     return ({ ...state})
   }),
  on(AddMessage, (state, {newmessages , cid}) => {
   state.conversations?.forEach((c : Conversation, i)=>{
      if(c.id == cid){
        console.log("Adding")
        c.messages = [...c.messages,newmessages]
        state.conversations![i] = {...state.conversations![i], messages: c.messages}
      }
    });
    return ({ ...state})
  }),
  on(SetSeen, (state, {mid , cid}) => {
    state.conversations?.forEach((c : Conversation, i)=>{
      console.log("Update seen for conversation"+c.id+" "+cid)
       if(c.id == cid){

          c.messages.forEach((m, j)=>{
            if(m.id == mid){
              state.conversations![i].messages[j].seen = new Date;
              state.conversations![i].lastMessageSeen = m;
              console.log("Update seen "+m.id)
            }
        })
       }
     });
     return ({ ...state})
   })
);
