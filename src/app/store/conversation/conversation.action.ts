import { Conversation } from './../../models/Conversation';
import { createAction, props } from '@ngrx/store'
import { Message } from 'src/app/models/Message';

// Section 2
const LOAD_ALL_CONVERSATIONS       = '[CONVERSATION] LOAD ALL CONVERSATIONS'
const LOAD_CONVERSATION    = '[CONVERSATION] LOAD CONVERSATION'
const LOAD_ALL_SUCCESS = '[CONVERSATION] LOAD ALL SUCCESS'
const ADD_CONVERSATION = '[CONVERSATION] ADD_CONVERSATION'
const ADD_MESSAGE = '[CONVERSATION] ADD_MESSAGE'
const SEEN_MESSAGE = '[CONVERSATION] SEEN_MESSAGE'
export const LoadAllConversations = createAction(
  LOAD_ALL_CONVERSATIONS
);

export const LoadConversation = createAction(
  LOAD_CONVERSATION,
  props<{ conversation: Conversation | number }>()
);

export const LoadAllSuccess = createAction(
  LOAD_ALL_SUCCESS,
  props<{ conversations: Conversation[] | null }>()
)
export const AddConversation = createAction(
  ADD_CONVERSATION,
  props<{ conversation: Conversation }>()
)
export const AddMessage = createAction(
  ADD_MESSAGE,
  props<{ newmessages: Message , cid : number}>()
)
export const SetSeen = createAction(
  SEEN_MESSAGE,
  props<{ mid: number , cid : number}>()
)
