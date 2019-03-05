import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'product-card',
    templateUrl: 'product-card.component.html',
    styleUrls: ['product-card.component.scss']
})
export class ProductCardComponent {
    
    public imageUrl=environment.mediaServer;

    @Input() id: number=0;
    @Input() image: string="/assets/images/chair.jpg";
    @Input() time: string="2018-10-27 18:20";
    @Input() tags:string="Travel,Cars,Phone";
    @Input() rate:number=4;
    @Input() title:string="MeToKey Title-Title-Title ...";
    @Input() price:number=34.50;
    @Input() bprice:number=42.90;
    @Input() total:number=150;
    @Input() orders:number=115;
     constructor(public translate:TranslateService){
        
    }

}
