import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinePageComponent } from './pages/line-page/line-page.component';
import {RouterModule} from "@angular/router";
import {GridPageComponent} from "../grid/pages/grid-page/grid-page.component";



@NgModule({
  declarations: [
    LinePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LinePageComponent
      }
    ])
  ]
})
export class LineModule { }
