import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared';
import { StudentListRoutingModule } from './student-list-routing.module';
import { StudentListComponent } from './student-list.component';

@NgModule({
    imports: [CommonModule, PageHeaderModule, MaterialModule, FormsModule, StudentListRoutingModule],
    declarations: [StudentListComponent]
})
export class StudentListModule {
}
