import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
//import { FormComponent } from './components/form/form.component';
import {StationdetailComponent} from "./components/stationdetail/stationdetail.component";
import {DataService} from "./services/data.services";
//import { StudentdetailComponent } from './components/studentdetail/studentdetail.component';
//import { FormSubjectComponent } from './components/form-subject/form-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    //FormComponent,
    StationdetailComponent,
    //StudentdetailComponent,
    //FormSubjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
