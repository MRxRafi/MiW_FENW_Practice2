import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ScoreModel} from '../scores/score.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://fenw.etsisi.upm.es:10000';
  constructor(private http: HttpClient) { }
  public getScores(): Observable<any> {
    return this.http.get(this.baseUrl + '/records');
  }
  public getUserScores(token: string, username: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.get(this.baseUrl + '/records/' + username, { headers, observe: 'response' });
  }
  public login(username: string, password: string): Observable<any> {
    return this.http.get(this.baseUrl + '/users/login?username=' + username + '&password=' + password);
  }
  public signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + '/users', { username, email, password });
  }
  public isUsernameInDB(username: string): Observable<any> {
    return this.http.get(this.baseUrl + '/users/' + username, { observe: 'response' });
  }
  public saveRecord(token: string, score: ScoreModel): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.post(this.baseUrl + '/records/', JSON.stringify(score), { headers, observe: 'response' });
  }
  public deletePersonalRecords(token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this.http.delete(this.baseUrl + '/records', { headers });
  }
}
