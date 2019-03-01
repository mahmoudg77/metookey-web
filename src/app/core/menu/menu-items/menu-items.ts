import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  data?:string
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'DASHBOARD',
    type: 'link',
    icon: 'icon-speedometer icons',
  },
  {
    state: 'pages',
    name: 'BLANK',
    type: 'link',
    icon: 'icon-book-open icons',
  },
  {
    state: 'accounts',
    name: 'Accounts',
    type: 'sub',
    icon: 'icon-user icons',
    children: [
      {state: 'list', name: 'Admin Account',data: '1',},
      {state: 'list', name: 'Sales Account',data: '2',},
      {state: 'list', name: 'Normal Account',data: '3',},
    ]
  },
  {
    state: 'activeties',
    name: 'Activeties',
    type: 'link',
    icon: 'icon-menu icons',
  },
  // {
  //   state: 'users',
  //   name: 'Users',
  //   type: 'link',
  //   icon: 'icon-menu icons',
  // },
  {
    state: 'companies',
    name: 'Companies',
    type: 'link',
    icon: 'icon-handbag icons',
  },
  {
    state: 'session',
    name: 'SESSIONS',
    type: 'sub',
    icon: 'icon-login icons',
    children: [
      {state: 'loginone', name: 'LOGIN'},
      {state: 'register', name: 'REGISTER'},
      {state: 'forgot-password', name: 'FORGOT'},
      {state: 'coming-soon', name: 'COMING SOON'},
      {state: 'lockscreen', name: 'LOCKSCREEN'},
      {state: 'subscribes', name: 'SUBSCRIBES'},
      {state: 'undermaintance', name: 'UNDER MAINTANCE'},
      {state: 'not-found', name: '404'},
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
