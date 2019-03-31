import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamComponent } from './exam.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material';
import { AddExamComponent } from './add-exam/add-exam.component';

@NgModule({
    imports: [CommonModule, ExamRoutingModule, PageHeaderModule, MaterialModule, FormsModule, ReactiveFormsModule ],
    declarations: [ExamComponent, AddExamComponent],
})
export class ExamModule {
}
