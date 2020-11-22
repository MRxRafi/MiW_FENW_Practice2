import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  repeatPassword = '';
  usernameExists = false;
  fieldsOk = true;
  signedUp = false;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }
  checkUsernameExists(): void {
    this.httpService.isUsernameInDB(this.username).subscribe(response => {
      if (response.body === this.username) { this.usernameExists = true; }
    }, error => {
      if (error.status === 404) { this.usernameExists = false; }
    });
  }
  submitSignup(evt): void {
    evt.preventDefault();
    this.fieldsOk = this.areFieldsOk();
    if (this.fieldsOk) {
      this.httpService.signUp(this.username, this.email, this.password).subscribe(response => {
        console.log(response);
        this.signedUp = true;
        setTimeout(() => this.signedUp = false, 3000);
      });
    }
  }
  private areFieldsOk(): boolean {
    if (this.username === '' || this.usernameExists) { return false; }
    if (this.email === '' || !this.email.includes('@')) { return false; }
    if (this.password === '' || this.repeatPassword === '') { return false; }
    if (this.password !== this.repeatPassword) { return false; }
    return true;
  }
}
