import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/http.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  repeatPassword = new FormControl('', [Validators.required]);
  hidePassword = true;
  usernameExists = false;
  passwordsMatch = true;
  signedUp = false;
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }
  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Debes introducir un valor';
    }

    return this.email.hasError('email') ? 'El email no es válido' : '';
  }
  checkUsernameExists(): void {
    this.httpService.isUsernameInDB(this.username.value).subscribe(response => {
      if (response.body === this.username.value) { this.usernameExists = true; }
    }, error => {
      if (error.status === 404) { this.usernameExists = false; }
    });
  }
  submitSignup(evt): void {
    evt.preventDefault();
    if (this.username.invalid) { return; }
    if (this.email.invalid) { return; }
    if (this.password.invalid) { return; }
    if (this.repeatPassword.invalid) { return; }
    if (this.usernameExists) { return; }
    if (!this.passwordsMatch) { return; }
    this.httpService.signUp(this.username.value, this.email.value, this.password.value).subscribe(response => {
      this.signedUp = true;
      setTimeout(() => this.signedUp = false, 3000);
    });
  }
  doesPasswordsMatch(): void {
    if (this.password.value !== this.repeatPassword.value) {
      this.passwordsMatch = false;
    } else {
      this.passwordsMatch = true;
    }
  }
}
