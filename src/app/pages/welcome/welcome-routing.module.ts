import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { ExamResultListResolver } from './result/result.service';

const routes: Routes = [
  {
    path: 'exam/result',
    component: ResultComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ExamResultListResolver]
})
export class WelcomeRoutingModule { }
