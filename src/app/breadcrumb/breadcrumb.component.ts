import { Component, OnChanges } from '@angular/core';
import "rxjs/add/operator/filter";
import { Params, ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '../../../node_modules/@angular/router';
import { Location } from '@angular/common';


  interface IBreadcrumb {
    label: string;
    params: Params;
    url: string;
  }


@Component({
    moduleId: module.id,
    selector: 'bread-crumb',
    templateUrl: 'breadcrumb.component.html',
    styleUrls: ['breadcrumb.component.scss']
})
export class BreadcrumbComponent {

    public breadcrumbs: IBreadcrumb[];

  /**
   * @class DetailComponent
   * @constructor
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location:Location
  ) {
    this.breadcrumbs = [];
    
  }
 
  /**
   * Let's go!
   *
   * @class DetailComponent
   * @method ngOnInit
   */
  ngOnInit() {
    
    this.breadcrumbs = this.getMyBreadcrumbs();

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
    
      this.breadcrumbs = this.getMyBreadcrumbs();
    });
  }

 
  getMyBreadcrumbs():IBreadcrumb[]{
    var b:IBreadcrumb[]=[]
      const url=this.location.path().substring(1).split('?');
       var arr=url[0].split('/');
       for (let index = 0; index < arr.length; index++) {
         const itm = arr[index];
         var parent="";
         for (let x = 0; x < index; x++) {
          parent+="/"+arr[x];
          }
          b.push({label:decodeURI(itm),url:parent+"/"+itm,params:null});
       }
       
     
    return b;
  }

}
