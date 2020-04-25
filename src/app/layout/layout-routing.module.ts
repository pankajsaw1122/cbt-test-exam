import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'exam', loadChildren: './exam/exam.module#ExamModule' },
            // { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' },
            // { path: 'questions', loadChildren: './questions/questions.module#QuestionsModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            // { path: 'student-list', loadChildren: './student-list/student-list.module#StudentListModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
