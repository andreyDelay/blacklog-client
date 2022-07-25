import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JointPageComponent } from './pages/joint-page/joint-page.component';
import {RouterModule} from "@angular/router";
import {GridPageComponent} from "../grid/pages/grid-page/grid-page.component";

@NgModule({
  declarations: [
    JointPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: JointPageComponent
      }
    ])
  ]
})
export class JointModule { }
