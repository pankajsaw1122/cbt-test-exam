import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule
    ],
    declarations: [
        DashboardComponent,
    ]
})
export class DashboardModule {}
