import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule } from '@angular/material';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
    imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule {}
