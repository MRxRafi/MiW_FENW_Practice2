import {Component} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeLink = [true, false, false, false, false, false];
  lastActiveLink = 0;
  constructor() { }
  changeHeader(clickedHeader): void {
    this.activeLink[this.lastActiveLink] = false;
    this.activeLink[clickedHeader] = true;
    this.lastActiveLink = clickedHeader;
  }
}
