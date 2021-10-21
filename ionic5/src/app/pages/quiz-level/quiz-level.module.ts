import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizLevelPageRoutingModule } from './quiz-level-routing.module';

import { QuizLevelPage } from './quiz-level.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizLevelPageRoutingModule
  ],
  declarations: [QuizLevelPage]
})
export class QuizLevelPageModule {}
