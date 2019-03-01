import { Component } from '@angular/core';
import { Router, NavigationEnd, Scroll } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
constructor(private router:Router){}
}
