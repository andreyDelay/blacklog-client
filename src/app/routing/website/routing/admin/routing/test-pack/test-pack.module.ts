import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPackPageComponent } from './pages/test-pack-page/test-pack-page.component';
import {RouterModule} from "@angular/router";
import {GridPageComponent} from "../grid/pages/grid-page/grid-page.component";



@NgModule({
  declarations: [
    TestPackPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TestPackPageComponent
      }
    ])
  ]
})
export class TestPackModule { }
