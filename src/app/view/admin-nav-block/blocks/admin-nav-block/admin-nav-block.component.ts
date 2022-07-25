import { Component, OnInit } from '@angular/core';
import {NestedTreeNode} from "../../models/nested-tree-node";
import {of} from "rxjs";
import {delay} from "rxjs/operators";

const TREE_DATA: NestedTreeNode[] = [
  {
    name: 'Analytics',
    children: [
      {
        name: 'Test Packs',
        href: '/admin/test-packs'
      },
      {
        name: 'Lines',
        href: '/admin/lines'
      },
      {
        name: 'Joints',
        href: '/admin/joints'
      },
    ]
  }, {
    name: 'Welders',
    icon: 'perm_identity',
    children: [
      {
        name: 'Admissions',
        icon: 'manage_accounts',
        href: '/admin/grid/account/admins'
      }, {
        name: 'Welders',
        icon: 'face',
        href: '/admin/grid/account/users'
      },
    ]
  }, {
    name: 'Settings',
    icon: 'settings',
    children: [
      {
        name: 'General',
        href: '/admin/form/settings/general'
      }, {
        name: 'Catalog',
        href: '/admin/form/settings/catalog'
      },
    ]
  }
];

@Component({
  selector: 'app-admin-nav-block',
  templateUrl: './admin-nav-block.component.html',
  styleUrls: ['./admin-nav-block.component.scss']
})
export class AdminNavBlockComponent implements OnInit {

  data = of<NestedTreeNode[]>(TREE_DATA).pipe(
    delay(500)
  );

  constructor() { }

  ngOnInit(): void {
  }

}
