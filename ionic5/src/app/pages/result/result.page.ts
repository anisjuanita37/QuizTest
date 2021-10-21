import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  score: any;
  noOfCorrectAnswer: any;
  noOfWrongAnswer: any;
  totalNoOfQuestions: any;
  answers: any;

  constructor(public route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.score = this.router.getCurrentNavigation().extras.state.score;
        this.totalNoOfQuestions = this.router.getCurrentNavigation().extras.state.total_questions;
      }
    })
  }

  ngOnInit() {

  }


  ionViewDidEnter() {
    this.noOfCorrectAnswer = this.score / 20; //My standard score increment value is 20. Calculated correct answer based on it. you can get your data here.
    this.noOfWrongAnswer = this.totalNoOfQuestions - this.noOfCorrectAnswer;
  }

  viewOverallResult() {
    this.router.navigate(['/chart']);
  }

  ContinueToNextTest() {
    this.router.navigate(['/quiz-level']);
  }

}
