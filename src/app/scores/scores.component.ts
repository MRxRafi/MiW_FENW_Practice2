import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/http.service';
import {ScoreModel} from './score.model';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: ScoreModel[];
  personalScores: ScoreModel[] = [];
  constructor(private httpService: HttpService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.httpService.getScores().subscribe(
      (scores: ScoreModel[]) => {
        this.scores = scores;
      });
    this.userService.getUserRecords().subscribe(response => {
      this.userService.generateToken(response.headers.get('Authorization'));
      const username = this.userService.username;
      const userScores: ScoreModel[] = response.body;
      if (username !== undefined) {
        for (const score of userScores) {
          if (score.username === username) { this.personalScores.push(score); }
        }
      }
    }, error => {  });
  }
  deletePersonalScores(): void {
    this.userService.deletePersonalRecords();
    this.personalScores = [];
  }
}
