import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
    imports: [MatButtonModule,
        MatCardModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatTableModule,
        MatCommonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatListModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatDialogModule,
        MatTabsModule
    ],

    exports: [MatButtonModule,
        MatCardModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatTableModule,
        MatCommonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatListModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatDialogModule,
        MatTabsModule
    ]
})

export class MaterialModule {

}

