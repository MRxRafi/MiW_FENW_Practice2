import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PreferencesComponent} from './preferences/preferences.component';
import {PlayComponent} from './play/play.component';
import {ScoresComponent} from './scores/scores.component';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'preferencias', component: PreferencesComponent },
  { path: 'jugar', component: PlayComponent },
  { path: 'puntuaciones', component: ScoresComponent },
  { path: 'registro', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
