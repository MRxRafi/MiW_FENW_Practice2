import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeLink = [true, false, false, false, false, false];
  lastActiveLink = 0;
  userLogged = false;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.tokenSubject$.asObservable().subscribe(
      (token) => {
        if (token !== undefined) {
          this.userLogged = true;
        } else {
          this.userLogged = false;
        }
      });
  }

  changeHeader(clickedHeader): void {
    this.activeLink[this.lastActiveLink] = false;
    this.activeLink[clickedHeader] = true;
    this.lastActiveLink = clickedHeader;
  }
  logOut(): void {
    this.changeHeader(0);
    this.userService.generateToken(undefined);
  }
}
