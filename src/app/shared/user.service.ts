import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ScoreModel} from '../scores/score.model';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenSubject$: Subject<string> = new Subject();
  username: string;
  private token: string;
  constructor(private httpService: HttpService) { }
  generateToken(newToken): string {
    this.token = newToken;
    this.tokenSubject$.next(this.token);
    if (this.token === undefined) {
      this.username = undefined;
    }
    return this.token;
  }
  getToken(): string {
    return this.token;
  }
  getUserRecords(): Observable<any> {
    return this.httpService.getUserScores(this.token, this.username);
  }
  saveRecord(score: ScoreModel): Observable<any> {
    return this.httpService.saveRecord(this.token, score);
  }
  deletePersonalRecords(): void {
    this.httpService.deletePersonalRecords(this.token).subscribe(newToken => this.generateToken(newToken));
  }
}
