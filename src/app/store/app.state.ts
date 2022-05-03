import { UsersState, UserReducer } from './user/user.reducer';
import { ConversationReducer, State } from './conversation/conversation.reducer';
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  conversations: State,
  users: UsersState
}

export const reducers: ActionReducerMap<AppState> = {
  users: UserReducer,
  conversations: ConversationReducer
};
