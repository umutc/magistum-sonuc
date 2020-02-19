import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { ResultComponent } from './result/result.component';
import { ResultService } from './result/result.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule, NzButtonModule, NzListModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ResultDetailComponent } from './result-detail/result-detail.component';
import { SumallPipe } from './pipes/sumall.pipe';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzListModule,
    FormsModule,
    ReactiveFormsModule,
    NzResultModule,
  ],
  declarations: [ResultComponent, ResultDetailComponent, SumallPipe],
  exports: [],
  providers: [ResultService, SumallPipe]
})
export class WelcomeModule { }
