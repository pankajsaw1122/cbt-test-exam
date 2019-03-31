import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinishExamComponent } from './finish-exam.component';

const routes: Routes = [
    {
        path: '', component: FinishExamComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinishExamRoutingModule {
}
