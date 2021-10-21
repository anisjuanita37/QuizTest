import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { MyService } from './../../service/myService/my-service.service';

@Component({
  selector: 'app-quiz-level',
  templateUrl: './quiz-level.page.html',
  styleUrls: ['./quiz-level.page.scss'],
})
export class QuizLevelPage implements OnInit {

  levels: any;
  timer: any;
  timerInterval: any;
  levelId: any;
  myloader: any;
  alert: any;

  constructor(private router: Router,
    private myService: MyService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.myService.getLevels().subscribe((data: any) => {
      this.levels = data.levels[0].difficulty;
    });
  }

  startTest(levelId) {
    this.levelId = levelId;
    this.getLevelQuestions();
  }

  //Getting quiz question here to save time
  getLevelQuestions() {
    this.myService.getQuestions().subscribe((data: any) => {
      this.showTestAlert(data.questions);
    });
  }

  //Showing test details
  async showTestAlert(questions) {
    let alert = await this.alertCtrl.create({
      header: 'Quiz Details',
      message: `<table class="detailsTable">` +
        `<tr class="detailsrecord"><td class="leftCol">No of Questions</td><td class="rightCol">` + questions.length + `</td></tr>` +
        `<tr class="detailsrecord"><td class="leftCol">Time/Question</td><td class="rightCol">3s</td></tr>` +
        `<tr class="detailsrecord"><td class="leftCol">Points/Question</td><td class="rightCol">20</td></tr>` +
        `</table>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Start Quiz',
          handler: () => {
            this.startTimerLoading(questions);
          }
        }
      ],

    });
    await alert.present();
  }

  //Showing timer before starting the test
  async startTimerLoading(questions) {
    this.timer = 3;
    let loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      message: this.timer,
      cssClass: 'quizlevelLoader'
    });
    loading.present();
    this.timerInterval = setInterval(() => {
      if (this.timer != 1) {
        this.timer--;
        loading.message = this.timer;
      } else {
        clearInterval(this.timerInterval);
        loading.dismiss();
        let navigationExtras: NavigationExtras = {
          state: {
            LevelId: this.levelId,
            Questions: questions
          }
        };
        this.router.navigate(['/test'], navigationExtras);
      }
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
