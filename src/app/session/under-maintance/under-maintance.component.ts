import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-under-maintance',
    templateUrl: './under-maintance.component.html',
    styleUrls: ['./under-maintance.component.scss'],
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class UnderMaintanceComponent implements OnInit {

  constructor(private pageTitleService: Title) { }

  ngOnInit() {
  	this.pageTitleService.setTitle("Under Maintance");
  }

}
