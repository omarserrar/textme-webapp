import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { setContacts, setDiscover, addContact, deleteContact, updateUser } from './user.action';

export interface UsersState {
  contact: User[] ,
  other: User[] ,
}
export const initialState: UsersState = {
  contact : [],
  other: [],
};

export const UserReducer = createReducer(
  initialState,
  on(setContacts, (state, {users}) =>{
    console.log("Setting contact ",state)
    state.contact.push(users[0])
    return ({ ...state,contact: users});
  }),
  on(setDiscover, (state, {users}) =>{
    console.log("Setting other ", state)
    return ({ ...state, other: users});
  }),
  on(addContact, (state, {user}) =>{
    let i = state.other.findIndex((u)=>u.id == user.id)
    if(i>=0){
      state.other.splice(i, 1);
      state.contact.push(user)
    }

    return ({ ...state});
  }),
  on(deleteContact, (state, {user}) =>{
    let i = state.contact.findIndex((u)=>u.id == user.id)
    if(i>=0){
      state.contact.splice(i, 1);
      state.other.push(user)
    }
    return ({ ...state});
  }),
  on(updateUser, (state, {user}) =>{
    let i = state.contact.findIndex((u)=>u.id == user.id)
    if(i>=0){
      console.log("Set online")
      state.contact[i] = {...user}
    }
    else{
      i = state.other.findIndex((u)=>u.id == user.id)
      if(i>=0){
        console.log("Set online")
        state.other[i] = {...user}
      }
    }
    return ({ ...state});
  })
);
