import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/http.service';
import {Router} from '@angular/router';
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor(private httpService: HttpService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }
  login(event): void {
    event.preventDefault();
    this.httpService.login(this.username, this.password).subscribe((response) => {
      if (response.headers === undefined) {
        this.userService.token = response;
        this.userService.username = this.username;
        // TODO Cambiar header con observador
        this.router.navigate(['/inicio']);
      }
    });
  }

}
