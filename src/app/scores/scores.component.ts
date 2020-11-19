import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/http.service';
import {ScoreModel} from './score.model';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: ScoreModel[];
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getScores().subscribe(
      (scores: ScoreModel[]) => { this.scores = scores; }
    );
  }
}
