import { GlobalData } from './../services/global-data';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';
// import { FacebookService, InitParams, UIResponse, UIParams } from 'ngx-facebook';
//declare var FB:any;

@Component({
    moduleId: module.id,
    selector: 'share-buttons',
    templateUrl: 'share-buttons.component.html',
    styleUrls: ['share-buttons.component.scss']
})
export class ShareButtonsComponent {
    
    appUrl(){
        return window.location.protocol+"//"+ window.location.hostname;//+(window.location.port!='80'?':'+window.location.port:'')
      }
    constructor(private meta:Meta,
                private location:Location,
               // private fb: FacebookService,

        ){
            // const initParams: InitParams = {
            //     appId: GlobalData.settings.facebook_appid,
            //     version: 'v3.0'
            //   };
              
            //   fb.init(initParams);
    }

    facebook()
    {
    //   const  params:UIParams= {
    //         method: 'share_open_graph',
    //         action_type: 'og.shares',
    //         action_properties: JSON.stringify({
    //             object:{
    //                 'og:type':'og:product',
    //                 'fb:app_id':GlobalData.settings.facebook_appid,
    //                 'og:url': this.url,// this.meta.getTag('name="og:url"').content,
    //                 'og:title': "منتج جديد في ميتوكي",//this.meta.getTag('name="og:title"').content,
    //                 'og:description':this.description,// this.meta.getTag('name="og:description"').content,
    //                 'og:image': this.meta.getTag('property="og:image"').content,
    //                 'product:price:amount':this.meta.getTag('property="product:price:amount"').content,
    //                 'product:price:currency':"EGP"
    //             }
    //         })
    //     }

    //     console.log('fb',params);
    //     // FB.ui({
    //     //     method: 'share_open_graph',
    //     //     action_type: 'og.likes',
    //     //     action_properties: JSON.stringify({
    //     //         object: object
    //     //     })
    //     // },
    //     //  (response) =>{
    //     // // Action after response
    //     // });

    // this.fb.ui(params)
    //         .then((res: UIResponse) => console.log(res))
    //         .catch((e: any) => console.error(e));
    
    var  url= "https://www.facebook.com/sharer/sharer.php?u="+this.url;
    this.openShareWindow(url);
        
    }
get url(){
return this.appUrl()+this.location.path(true);
}
get title(){
    const meta=this.meta.getTag('property="og:title"');
return (meta==null?'':meta.content);
}
get description(){
    const meta=this.meta.getTag('property="og:description"');
    return (meta==null?'':meta.content);
}


    twitter(){
     var  url= "https://twitter.com/intent/tweet?text="+this.title+"&url="+this.url+"&related=";
     this.openShareWindow(url);
    }
    // google(){
    //     var  url= "whatsapp://send?text="+this.title+"&url="+this.url+"&related=";
    //     this.openShareWindow(url);
    // }
    whatsapp(){
        var  url= "whatsapp://send?text="+this.title+"&url="+this.url+"&related=";
        this.openShareWindow(url);
    } 
    pinterest(){
        var  url= "http://pinterest.com/pin/create/button/?description="+this.title+"&url="+this.url;
        this.openShareWindow(url);
    }
    linkedin(){
        var  url= "http://www.linkedin.com/shareArticle?mini=true&url="+this.url+"&title="+this.title+"&summary="+this.description+"&source="+this.url;
        this.openShareWindow(url);
    }
    openShareWindow(url:string){
        window.open(url,"sharewindow","status=1,width=600,height=300");
    }
}


