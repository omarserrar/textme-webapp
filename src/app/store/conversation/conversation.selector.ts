import { State } from './conversation.reducer';
import { Conversation } from './../../models/Conversation';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAllConversations = createFeatureSelector<State>('conversations');
export const selectConversation = (id: number) => createSelector(
  selectAllConversations,
  (state : State) => state.conversations?.filter((c)=> c.id == id),
)
