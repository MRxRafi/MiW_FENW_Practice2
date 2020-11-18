import {CardModel} from './card/card.model';

export class BoardModel {
  /*
  cardsArray: CardModel[];
  timerTime: number;
  constructor(cardsNumber: number, cardClassList, maxTime: number) {
    this.boardDivDOM = $('#cards_container')[0];
    this.timerTime = maxTime;
    $('#time')[0].innerHTML = maxTime;

    if (maxTime != 0) {
      this.idIntervalo = setInterval(() => this.decrementTime(), 1000);
    }

    this.score = 0;
    this.cardsArray = this.generateCards(cardsNumber, cardClassList);

    this.boardDivDOM.onclick = () => this.checkCards();
  }*/

  /*
  generateCards(cardsNumber, cardClassList): void {
    var cardsArray = [];
    var cards_game = [];

    for(var i = 0, max = cards_game.length; i < max; i++) {
      let card_id = 'card' + i;
      let cardName = cards_game[i];
      let card = new Card(card_id, cardClassList, cardName);
      card.createDOM(this.boardDivDOM);
      cardsArray.push(card);
    }

    return cardsArray;


  }*/

  /*
  checkCards() {
    const revealedCards = [];
    for (let i = 0, max = this.cardsArray.length; i < max; i++) {
      if (this.cardsArray[i].shown && !this.cardsArray[i].matched) {
        revealedCards.push(this.cardsArray[i]);
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
          revealedCards[0].updateDOM();
          revealedCards[1].updateDOM();
        }, 700);
      }
      $('#score')[0].innerHTML = this.score;
    }*/
}
