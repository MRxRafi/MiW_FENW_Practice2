import {Component} from '@angular/core';
import {PreferencesService} from '../shared/preferences.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  MIN_IMG_NUMBER = 20;
  MIN_TIME = 0;
  MAX_IMG_NUMBER = 32;
  MAX_TIME = 150;
  constructor(private router: Router,
              private prfService: PreferencesService) { }

  preferencesSubmitted(evt): void {
    const newImgNumber = parseInt($('#imgNumber').val() as string, 10);
    const newMaxTime = parseInt($('#maxTime').val() as string, 10);
    this.prfService.updatePreferences(newImgNumber, newMaxTime);
    evt.preventDefault();
    this.router.navigate(['/jugar']);
  }
}
