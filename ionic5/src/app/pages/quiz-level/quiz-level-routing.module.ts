import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizLevelPage } from './quiz-level.page';

const routes: Routes = [
  {
    path: '',
    component: QuizLevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizLevelPageRoutingModule {}
