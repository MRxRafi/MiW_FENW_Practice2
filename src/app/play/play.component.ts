import { Component } from '@angular/core';
import {PreferencesService} from '../shared/preferences.service';
import {CardModel} from './card.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {
  CARDS_NAMES = ['bastos1.jpg', 'bastos12.jpg', 'copas1.jpg', 'copas12.jpg',
    'espadas1.jpg', 'espadas12.jpg', 'oros1.jpg', 'oros12.jpg'];
  IMG_FOLDER = '../../assets/naipes/';
  IMG_CARD_BACK = 'reverso.jpg';
  gameCards: CardModel[];
  score = 0;
  totalScore = 0;
  time: number = this.prfService.maxTime;
  gameFinished = false;
  idTemporizador: number;
  constructor(private prfService: PreferencesService) {
    this.initGame();
  }

  private initGame(): void {
    this.gameCards = [];
    const numberOfCards = this.prfService.imgNumber;
    const gameCardsName = this.generateRandomCardsNames(numberOfCards);
    for (let i = 0; i < numberOfCards; i++) {
      const card = this.createCard(i, gameCardsName[i], this.IMG_FOLDER + this.IMG_CARD_BACK);
      this.gameCards.push(card);
    }
    if (this.time !== 0) {
      console.log(this.time);
      this.idTemporizador = setInterval(() => this.decrementTime(), 1000);
    }
  }

  checkCards(card: CardModel): void {
    this.flip(card);
    const revealedCards = [];
    for (let i = 0, max = this.gameCards.length; i < max; i++) {
      if (this.gameCards[i].shown && !this.gameCards[i].matched) {
        revealedCards.push(this.gameCards[i]);
      }
    }

    if (revealedCards.length === 2) {
      if (revealedCards[0].cardName === revealedCards[1].cardName) {
        this.score += 15;
        revealedCards[0].matched = true;
        revealedCards[1].matched = true;
        this.checkFinished();
      } else {
        this.score -= 5;
        setTimeout(() => {
          this.flip(revealedCards[0]);
          this.flip(revealedCards[1]);
        }, 700);
      }
    }
  }
  private checkFinished(): void {
    let numberOfMatched = 0;
    for (let i = 0, max = this.gameCards.length; i < max; i++) {
      if (this.gameCards[i].matched) { numberOfMatched++; }
    }
    if (numberOfMatched === this.gameCards.length) {
      // this.reset(); TEMPORIZADOR
      this.gameFinished = true;
      const maxTime = this.prfService.maxTime;
      if (this.gameCards.length === 26) { this.score += 25; }
      if (this.gameCards.length === 32) { this.score += 50; }
      if (maxTime === 30) { this.score += 150; }
      if (maxTime === 60) { this.score += 100; }
      if (maxTime === 90) { this.score += 75; }
      if (maxTime === 120) { this.score += 50; }
      if (maxTime === 150) { this.score += 25; }
    }
  }
  private generateRandomCardsNames(numberOfCards): string[] {
    const longitudArray = this.CARDS_NAMES.length;
    const gameCardsName = [];
    for (let i = 0; i < numberOfCards / 2; i++) {
      if (i < longitudArray) {
        gameCardsName.push(this.CARDS_NAMES[i]);
        gameCardsName.push(this.CARDS_NAMES[i]);
      } else {
        gameCardsName.push(this.CARDS_NAMES[i % longitudArray]);
        gameCardsName.push(this.CARDS_NAMES[i % longitudArray]);
      }
    }
    this.shuffle(gameCardsName);
    return gameCardsName;
  }
  private createCard(id: number, cardName: string, src: string): CardModel {
    return {
      id, cardName, src,
      shown: false,
      matched: false
    };
  }
  private flip(card: CardModel): void {
    if (!this.gameFinished && !card.matched) {
      if (!card.shown) {
        card.src = this.IMG_FOLDER + card.cardName;
        card.shown = true;
      } else {
        card.src = this.IMG_FOLDER + this.IMG_CARD_BACK;
        card.shown = false;
      }
    }
  }
  private decrementTime(): void {
    if (this.time > 0) {
      this.time--;
    }
    if (this.time <= 0) {
      this.gameFinished = true;
      clearInterval(this.idTemporizador);
    }
  }
  private shuffle(a): string[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
