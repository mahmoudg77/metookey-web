import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-subscribes',
    templateUrl: './subscribes.component.html',
    styleUrls: ['./subscribes.component.scss'],
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class SubscribesComponent implements OnInit {

  constructor(private pageTitleService: Title) { }

  ngOnInit() {
  	this.pageTitleService.setTitle("Subscribes");
  }

}
