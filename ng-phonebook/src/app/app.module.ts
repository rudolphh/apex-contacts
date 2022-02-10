import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactSearchComponent } from './components/contact-search/contact-search.component';
import { ContactService } from "./services/contacts.service";
import { ContactsComponent } from './components/contact-list/contacts.component';
import {HttpMockRequestInterceptor} from "./services/http-mock-request-interceptor.service";
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactFormComponent,
    ContactSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    ContactService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpMockRequestInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
