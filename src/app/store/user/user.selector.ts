import { AppState } from './../app.state';
import { User } from './../../models/User';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState } from './user.reducer';
import { State } from '../conversation/conversation.reducer';


export const selectUsersState = createFeatureSelector<UsersState>('users');
export const selectAllContacts =  createSelector(
  selectUsersState,
  (state: UsersState) => {
    if(state.contact && state.other){
      return state.contact
    }
    return null
  }
);
export const selectAll = createSelector(
  selectUsersState,
  (state: UsersState) => {
    return state.contact.concat(state.other)
  }
);
export const selectAllOther = createSelector(
  selectUsersState,
  (state: UsersState) => {
    if(state.contact && state.other){
      return state.other
    }
    return null
  }
);
export const selectUser = (id : number) => createSelector(
  selectUsersState,
  (state: UsersState) => {
    if(state.contact && state.other){
      let u = state.contact.find((u)=>u.id == id);
      if(u) return u;
      u = state.other.find((u)=>u.id == id);
      if(u) return u;
    }

    return null
  }
);


