import { Component } from '@angular/core';
import {PreferencesService} from '../shared/preferences.service';
import {CardModel} from './card.model';
import {ScorePanelModel} from './score-panel.model';

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
  scorePanel: ScorePanelModel;
  gameFinished = false;
  constructor(private prfService: PreferencesService) {
    this.initGame();
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
        this.scorePanel.score += 15;
        revealedCards[0].matched = true;
        revealedCards[1].matched = true;
        this.checkFinished();
      } else {
        this.scorePanel.score -= 5;
        setTimeout(() => {
          this.flip(revealedCards[0]);
          this.flip(revealedCards[1]);
        }, 700);
      }
    }
  }
  saveScore(): void {
    // TODO Salvar puntuación en BBDD, que aparezca un mensaje debajo diciendo Puntuacion salvada y deshabilitar botón
  }
  private initGame(): void {
    this.gameCards = [];
    const numberOfCards = this.prfService.imgNumber;
    const gameCardsName = this.generateRandomCardsNames(numberOfCards);
    const time = this.prfService.maxTime;
    let idTimer: number;
    for (let i = 0; i < numberOfCards; i++) {
      const card = this.createCard(i, gameCardsName[i], this.IMG_FOLDER + this.IMG_CARD_BACK);
      this.gameCards.push(card);
    }
    if (this.prfService.maxTime !== 0) {
      idTimer = setInterval(() => this.decrementTime(), 1000);
    }
    this.scorePanel = {
      score: 0,
      totalScore: 0,
      time,
      idTimer,
      saveHidden: true
    };
  }
  private checkFinished(): void {
    let numberOfMatched = 0;
    for (let i = 0, max = this.gameCards.length; i < max; i++) {
      if (this.gameCards[i].matched) { numberOfMatched++; }
    }
    if (numberOfMatched === this.gameCards.length) {
      const maxTime = this.prfService.maxTime;
      if (this.gameCards.length === 26) { this.scorePanel.score += 25; }
      if (this.gameCards.length === 32) { this.scorePanel.score += 50; }
      if (maxTime === 30) { this.scorePanel.score += 150; }
      if (maxTime === 60) { this.scorePanel.score += 100; }
      if (maxTime === 90) { this.scorePanel.score += 75; }
      if (maxTime === 120) { this.scorePanel.score += 50; }
      if (maxTime === 150) { this.scorePanel.score += 25; }
      this.scorePanel.totalScore = this.scorePanel.score;
      this.finishGame();
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
    if (this.scorePanel.time > 0) {
      this.scorePanel.time--;
    }
    if (this.scorePanel.time <= 0) {
      this.finishGame();
    }
  }
  private finishGame(): void {
    if (this.scorePanel.idTimer !== undefined) {
      clearInterval(this.scorePanel.idTimer);
    }
    // TODO que solo aparezca si el usuario está logged
    this.scorePanel.saveHidden = false;
    this.gameFinished = true;
  }
  private shuffle(a): string[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
