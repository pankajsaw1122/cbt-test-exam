import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: '', loadChildren: './login/login.module#LoginModule' },
    { path: 'dashboard', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    // { path: '', loadChildren: './login/login.module#LoginModule' },
    { path: 'instructions', loadChildren: './instructions/instructions.module#InstructionsModule' },
    { path: 'finishexam', loadChildren: './finish-exam/finish-exam.module#FinishExamModule' },

    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
