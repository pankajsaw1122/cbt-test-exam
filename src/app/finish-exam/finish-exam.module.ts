import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FinishExamRoutingModule } from './finish-exam-routing.module';
import { FinishExamComponent } from './finish-exam.component';
import { FooterComponent } from '../layout/components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FinishExamRoutingModule,
    MaterialModule,
  ],
  declarations: [FinishExamComponent]
})
export class FinishExamModule { }
