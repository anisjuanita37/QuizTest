import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HOME } from '../../service/constant';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  home: string = HOME;

  constructor(private router: Router) { }

  startQuiz() {
    this.router.navigate(['/quiz-level']);
  }

  callChart() {
    this.router.navigate(['/chart']);
  }

}
