import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamComponent } from './exam.component';
import { AddExamComponent } from './add-exam/add-exam.component';

const routes: Routes = [
    {
        path: '', component: ExamComponent,
    },
     {
        path: 'add-exam', component: AddExamComponent
     },
     {
        path: 'edit-exam/:id', component: AddExamComponent
     }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamRoutingModule {
}
