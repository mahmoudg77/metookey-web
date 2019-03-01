import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { fadeInAnimation } from "../core/route-animation/route.animation";
import * as Ps from 'perfect-scrollbar';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'ms-dashboard',
  templateUrl: 'dashboard-component.html',
  styleUrls: ['dashboard-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit {

  constructor(private pageTitleService: Title, private route: Router, private shared: SharedService,public translate: TranslateService) {

  }

  ngOnInit() {
    this.pageTitleService.setTitle("Dashboard");
  }

}














