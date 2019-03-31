import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { InstructionsRoutingModule } from './instructions-routing.module';
import { InstructionsComponent } from './instructions.component';

@NgModule({
  imports: [
    CommonModule,
    InstructionsRoutingModule,
    MaterialModule
  ],
  declarations: [InstructionsComponent]
})
export class InstructionsModule { }
