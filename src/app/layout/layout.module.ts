import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { FooterComponent } from './components/footer/footer.component';

import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material.module';
import { MatDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatInfoDialogComponent } from '../shared/info-dialog/info-dialog.component';

import { CountdownModule } from 'ngx-countdown';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MaterialModule,
        CountdownModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, MatDialogComponent, MatInfoDialogComponent],
    entryComponents: [
        MatDialogComponent,
        MatInfoDialogComponent
    ],
})
export class LayoutModule {}
