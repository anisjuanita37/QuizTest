import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  {
    path: 'chart',
    loadChildren: () => import('./pages/chart/chart.module').then(m => m.ChartPageModule)
  },
  {
    path: 'quiz-level',
    loadChildren: () => import('./pages/quiz-level/quiz-level.module').then(m => m.QuizLevelPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then(m => m.ResultPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then(m => m.TestPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
