import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  public login(username: string, password: string): Observable<any> {
    return this.http.get(this.baseUrl + '/users/login?username=' + username + '&password=' + password);
  }
  public saveRecord(token: string, score: ScoreModel): Observable<any> {
    // TODO Falta enviar token en la cabecera
    return this.http.post(this.baseUrl + '/records', JSON.stringify(score));
  }
}
