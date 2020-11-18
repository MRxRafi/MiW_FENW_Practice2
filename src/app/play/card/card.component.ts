import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  IMG_FOLDER = '../../../assets/naipes/';
  IMG_CARD_BACK = 'reverso.jpg';
  @Input() cardName: string;
  @Input() gameFinished: boolean;
  card: CardModel;
  constructor() { }

  ngOnInit(): void {
    this.card = {
      cardName: this.cardName,
      src: this.IMG_FOLDER + this.IMG_CARD_BACK,
      shown: false,
      matched: false
    };
  }

  flip(): void {
    if (!this.gameFinished && !this.card.matched) {
      if (!this.card.shown) {
        this.card.src = this.IMG_FOLDER + this.card.cardName;
        this.card.shown = true;
      } else {
        this.card.src = this.IMG_FOLDER + this.IMG_CARD_BACK;
        this.card.shown = false;
      }
    }
  }
}
