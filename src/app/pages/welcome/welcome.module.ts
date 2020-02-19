import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { ResultComponent } from './result/result.component';
import { ResultService } from './result/result.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule, NzButtonModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ResultComponent],
  exports: [],
  providers: [ResultService]
})
export class WelcomeModule { }
