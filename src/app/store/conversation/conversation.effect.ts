import { MessengerServiceService } from './../../services/messenger-service.service';
import { LoadAllConversations, LoadAllSuccess } from './conversation.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class ConversationEffects {
  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAllConversations),
      switchMap(() => this.msgService.getConversations().pipe(
        map(conversations => LoadAllSuccess({conversations: conversations.body})),
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private msgService: MessengerServiceService
  ) {}
}
