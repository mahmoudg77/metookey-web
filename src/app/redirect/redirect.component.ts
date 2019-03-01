import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'redirect',
    template:'',
 })
export class RedirectComponent  implements OnInit{
    url: string;
    ngOnInit(): void {
        this.route.params.subscribe(params=>{
            this.url = params['url'];
            this.router.navigateByUrl(this.url);
        });
    }
    constructor(private router: Router,private route:ActivatedRoute){
        
    }
     
}
