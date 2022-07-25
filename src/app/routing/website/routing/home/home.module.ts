import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AdminFooterBlockModule} from "../../../../view/admin-footer-block/admin-footer-block.module";


@NgModule({
  declarations: [
    HomePageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: HomePageComponent
            }
        ]),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        AdminFooterBlockModule
    ]
})
export class HomeModule { }
