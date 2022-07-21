import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderBlockComponent } from './admin-header-block/admin-header-block.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AdminHeaderBlockComponent
  ],
  exports: [
    AdminHeaderBlockComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class AdminHeaderBlockModule { }
