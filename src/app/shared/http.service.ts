import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://fenw.etsisi.upm.es:10000';
  constructor(private http: HttpClient) { }
  public getScores(): Observable<any> {
    return this.http.get(this.baseUrl + '/records');
  }
}
