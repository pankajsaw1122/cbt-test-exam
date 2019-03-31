import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

const routes: Routes = [
    {
        path: '', component: QuestionsComponent
    },
    {
        path: 'add-questions', component: AddQuestionsComponent
    },
    {
        path: 'edit-questions/:id', component: AddQuestionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsRoutingModule {
}
