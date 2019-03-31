import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { CategoriesComponent } from './categories.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, CategoriesRoutingModule, PageHeaderModule, MaterialModule, FormsModule, ReactiveFormsModule],
    declarations: [CategoriesComponent, AddCategoriesComponent]
})
export class CategoriesModule {}
