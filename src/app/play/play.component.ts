import { Component, OnInit } from '@angular/core';
import {PreferencesService} from '../shared/preferences.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  CARDS_NAMES = ['bastos1.jpg', 'bastos12.jpg', 'copas1.jpg', 'copas12.jpg',
    'espadas1.jpg', 'espadas12.jpg', 'oros1.jpg', 'oros12.jpg'];
  gameCardsName: string[];
  score = 0;
  totalScore = 0;
  gameFinished = false;
  time = this.prfService.maxTime;
  constructor(private prfService: PreferencesService) {
    const longitudArray = this.CARDS_NAMES.length;
    this.gameCardsName = [];
    for (let i = 0; i < prfService.imgNumber / 2; i++) {
      if (i < longitudArray) {
        this.gameCardsName.push(this.CARDS_NAMES[i]);
        this.gameCardsName.push(this.CARDS_NAMES[i]);
      } else {
        this.gameCardsName.push(this.CARDS_NAMES[i % longitudArray]);
        this.gameCardsName.push(this.CARDS_NAMES[i % longitudArray]);
      }
    }
    this.shuffle(this.gameCardsName);
  }

  ngOnInit(): void {
  }

  checkCards(): void {
  }

  private shuffle(a): string[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
