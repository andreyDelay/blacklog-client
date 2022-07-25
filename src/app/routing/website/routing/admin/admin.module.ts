import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {AdminFooterBlockModule} from "../../../../view/admin-footer-block/admin-footer-block.module";
import {AdminHeaderBlockModule} from "../../../../view/admin-header-block/admin-header-block.module";
import {AdminNavBlockModule} from "../../../../view/admin-nav-block/admin-nav-block.module";

@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminPageComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'dashboard'
          },
          {
            path: 'dashboard',
            loadChildren: () => import('./routing/dashboard/dashboard.module')
              .then(module => module.DashboardModule)
          },
          {
            path: 'test-packs',
            loadChildren: () => import('./routing/test-pack/test-pack.module')
              .then(module => module.TestPackModule)
          },
          {
            path: 'lines',
            loadChildren: () => import('./routing/line/line.module')
              .then(module => module.LineModule)
          },
          {
            path: 'joints',
            loadChildren: () => import('./routing/joint/joint.module')
              .then(module => module.JointModule)
          },
          {
            path: 'form/:namespace/:entity',
            loadChildren: () => import('./routing/form/form.module')
              .then(module => module.FormModule)
          }
        ]
      }
    ]),
    AdminFooterBlockModule,
    AdminHeaderBlockModule,
    AdminNavBlockModule
  ]
})
export class AdminModule { }
