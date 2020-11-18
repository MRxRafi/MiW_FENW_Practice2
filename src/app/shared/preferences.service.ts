import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  imgNumber = 20;
  maxTime = 0;
  constructor() { }
  updatePreferences(imgNumber: number, maxTime: number): void {
    this.imgNumber = imgNumber;
    this.maxTime = maxTime;
  }
}
