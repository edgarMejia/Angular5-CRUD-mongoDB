import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from './utils/material.module'
import { AppRoutingModule } from './utils/app-routing.module';

import { PersonService } from './services/person.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LayoutComponent,
        FooterComponent,
        ConfirmComponent,
        SnackbarComponent,
        FormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        MaterialComponentsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        PersonService
    ],
    entryComponents: [
        ConfirmComponent,
        SnackbarComponent,
        FormComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
