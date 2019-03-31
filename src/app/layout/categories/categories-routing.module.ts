import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';

const routes: Routes = [
    {
        path: '', component: CategoriesComponent
    },
    {
      path: 'add-categories', component: AddCategoriesComponent
  },
  {
    path: 'edit-categories/:id', component: AddCategoriesComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
