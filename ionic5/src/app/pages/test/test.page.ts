import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { MyService } from '../../service/myService/my-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  @ViewChild('mySlider', { static: true }) slider: IonSlides;
  levelId: any;
  questions: any;
  mySlideOptions: any = {
    onlyExternal: true
  };
  totalDuration: any;
  score: number;
  scoreIncrementValue: number = 20;    //Score value to be incremented.
  score_final: number;
  displayIncrement: boolean = false;
  count: number = 0;
  questionIndicator: Array<any>;
  interval: any;
  isDisabled: boolean = false;

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public myService: MyService) {
    activatedRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.levelId = this.router.getCurrentNavigation().extras.state.LevelId;
        this.questions = this.router.getCurrentNavigation().extras.state.Questions;
        this.createQuestionIndicatorArray(this.questions.length);
      }
    })
  }

  ngOnInit(): void {

  }

  //Initialize the score, timer and pointing first question
  ionViewDidEnter() {
    this.slider.lockSwipes(true);
    this.score = 0;
    this.score_final = 0;
    this.questionIndicator[this.count].id = 0; //Current Question
    this.calculateProgress();
  }

  //Setting the timer for each question
  calculateProgress() {
    this.totalDuration = 50;    //Set the standarad time value for each question or use your timer variable to set dynamically
    let elapse = this.totalDuration;
    this.interval = setInterval(() => {
      let timePercent = (elapse / this.totalDuration) * 100;
      if (timePercent > 100) {
        timePercent = 100;
      }
      document.getElementById("progress-bar").style.width = timePercent + "%";
      elapse--;
      if (timePercent < 1) {
        this.onOptionSelected("0_0", "0_1"); //Send some value as dummy wrong answer
      }
      if (timePercent < 30) {
        document.getElementById("progress-bar").style.background = 'red';
        document.getElementById("progress").style.borderColor = "red";
      } else if (timePercent < 60) {
        document.getElementById("progress-bar").style.background = 'orange';
        document.getElementById("progress").style.borderColor = "orange";
      }
    }, 300);
  }

  createQuestionIndicatorArray(length) {
    this.questionIndicator = new Array();
    for (let i = 0; i < length; i++) {
      this.questionIndicator.push({ "id": -1 });
    }
  }


  onOptionSelected(optionChoose, optionCorrect) {
    clearInterval(this.interval);
    this.isDisabled = true;
    if (optionChoose === optionCorrect) {   //If option choose is correct. Append your code with this on correct answer choose
      this.displayIncrement = true;
      this.questionIndicator[this.count].id = 1;
      this.count++;
      setTimeout(() => {
        this.displayIncrement = false;
        let i = 1;
        let increment = setInterval(() => {
          if (i === (this.scoreIncrementValue + 1)) {
            clearInterval(increment);
          } else {
            this.score += 1;
            i++;
          }
        }, 45);
        this.slideToNextQuestion(); //Move to next question
      }, 1000);
      this.score_final += 20;
    } else {                                //If option choose is wrong. Append your code with this on wrong answer choose
      this.questionIndicator[this.count].id = 2;
      this.count++;
      this.slideToNextQuestion();  //Move to next question
    }
  }


  //Moves to next question
  slideToNextQuestion() {
    this.slider.isEnd().then((data: any) => {
      if (data == false) {
        setTimeout(() => {
          this.questionIndicator[this.count].id = 0; //Set next question as current question
          this.slider.lockSwipes(false);
          this.slider.slideNext();
          this.slider.lockSwipes(true);
          this.isDisabled = false;
          document.getElementById("progress-bar").style.width = "100%";
          document.getElementById("progress-bar").style.background = 'limegreen';
          document.getElementById("progress").style.borderColor = "limegreen";
          this.calculateProgress();
        }, 1000);
      } else {
        setTimeout(() => {
          let navigationExtras: NavigationExtras = {
            state: {
              score: this.score_final,
              total_questions: this.questionIndicator.length
            }
          }
          this.router.navigate(['/result'], navigationExtras);
        }, 1000);
      }
    });
  }

  //Terminating the test
  closeTest() {
    clearInterval(this.interval);
    this.router.navigate(['/quiz-level']);
  }

}
