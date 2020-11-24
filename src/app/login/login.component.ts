import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/http.service';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hidePassword = true;
  fieldsOk = true;
  textoError = '';
  constructor(private httpService: HttpService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }
  login(event): void {
    event.preventDefault();
    if (this.username.hasError('required')) { return; }
    if (this.password.hasError('required')) { return; }
    this.httpService.login(this.username.value, this.password.value).subscribe((response) => {
      if (response.headers === undefined) {
        this.fieldsOk = true;
        this.userService.generateToken(response);
        this.userService.username = this.username.value;
        this.router.navigate(['/inicio']);
      }
    }, error => {
      if (error.status === 401) {
        this.fieldsOk = false;
        this.httpService.isUsernameInDB(this.username.value).subscribe(response => {
          this.textoError = 'Contraseña incorrecta. Vuelva a intentarlo';
        }, error1 => {
          this.textoError = 'Usuario incorrecto. Vuelva a intentarlo';
        });
      }
    });
  }

}
