import { reducers } from './store/app.state';
import { UserReducer } from './store/user/user.reducer';
import { ConversationEffects } from './store/conversation/conversation.effect';
import { ConversationReducer } from './store/conversation/conversation.reducer';
import { AuthHTTPInterceptorInterceptor } from './auth-httpinterceptor.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './pages/user/user.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ListComponent } from './components/discoverContact/list/list.component';
import { ElementComponent } from './components/discoverContact/element/element.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ContactElementComponent } from './components/contact/contact-element/contact-element.component';
import { UserEditFormComponent } from './components/user/user-edit-form/user-edit-form.component';
import { FormFieldErrorComponent } from './components/forms/form-field-error/form-field-error.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { ConversationsListComponent } from './components/conversation/conversations-list/conversations-list.component';
import { ConversationElementComponent } from './components/conversation/conversation-element/conversation-element.component';
import { MessageComponent } from './components/chat/message/message.component';
import { InputMessageComponent } from './components/chat/input-message/input-message.component';
import { RxStompService  } from '@stomp/ng2-stompjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserPictureComponent } from './components/user/user-picture/user-picture.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { PictureEditComponent } from './components/user/picture-edit/picture-edit.component';
import { UserRowComponent } from './components/user/user-row/user-row.component';
import { UserStatusComponent } from './components/user/user-status/user-status.component';
import { UserStatusCircleComponent } from './components/user/user-status-circle/user-status-circle.component';
import { UserLastActiveComponent } from './components/user/user-last-active/user-last-active.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterGuestFormComponent } from './components/forms/register-guest-form/register-guest-form.component';
import { RegisterFormComponent } from './components/Forms/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ContactsComponent,
    ListComponent,
    ElementComponent,
    ContactListComponent,
    ContactElementComponent,
    UserEditFormComponent,
    FormFieldErrorComponent,
    HomeComponent,
    ChatComponent,
    ConversationsListComponent,
    ConversationElementComponent,
    MessageComponent,
    InputMessageComponent,
    UserPictureComponent,
    UserInfoComponent,
    PictureEditComponent,
    UserRowComponent,
    UserStatusComponent,
    UserStatusCircleComponent,
    UserLastActiveComponent,
    LoginFormComponent,
    RegisterGuestFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ConversationEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHTTPInterceptorInterceptor, multi: true },
    RxStompService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
