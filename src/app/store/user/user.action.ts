import { Conversation } from '../../models/Conversation';
import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/models/User';

// Section 2
const SET_CONTACTS       = '[USER] SET CONTACTS'
const SET_DISCOVER    = '[USER] SET DISCOVER'
const UPDATE_USER = '[USER] UPDATE USER'
const DELETE_CONTACT = '[USER] DELETE CONTACT'
const ADD_CONTACT = '[USER] ADD CONTACT'
export const setContacts = createAction(
  SET_CONTACTS,
  props<{ users: User[] }>()
);
export const addContact = createAction(
  ADD_CONTACT,
  props<{ user: User}>()
);
export const deleteContact = createAction(
  DELETE_CONTACT,
  props<{ user: User}>()
);
export const setDiscover = createAction(
  SET_DISCOVER,
  props<{ users: User[] }>()
);


export const updateUser = createAction(
  UPDATE_USER,
  props<{ user: User }>()
);

