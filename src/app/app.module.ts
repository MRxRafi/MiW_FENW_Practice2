import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { PlayComponent } from './play/play.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ScoresComponent } from './scores/scores.component';
import { SignupComponent } from './signup/signup.component';

import { PreferencesService } from './shared/preferences.service';
import { HttpService } from './shared/http.service';
import { FromEpochPipe } from './pipes/from-epoch.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    PlayComponent,
    PreferencesComponent,
    ScoresComponent,
    SignupComponent,
    FromEpochPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PreferencesService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
