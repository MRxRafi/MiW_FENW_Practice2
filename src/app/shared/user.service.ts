import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenSubject$: Subject<string> = new Subject();
  username: string;
  private token: string;
  constructor() { }
  generateToken(newToken): string {
    this.token = newToken;
    this.tokenSubject$.next(this.token);
    if (this.token === undefined) {
      this.username = undefined;
    }
    return this.token;
  }
}
