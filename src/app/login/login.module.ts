import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule ],
    declarations: [LoginComponent]
})
export class LoginModule {}
