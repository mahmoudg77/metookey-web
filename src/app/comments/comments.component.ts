import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CallapiService } from './../services/callapi.service';
import { SharedService } from './../services/shared.service';
import { Component, Input, OnInit, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';
import { environment } from 'environments/environment';

// export class CommentItem{
//     id:number;
//     item_id:number;
//     user_id:number;
//     parent_comment_id:number
//     comment:string;
//     created_at:Date;
//     likes:number;
//     is_review:boolean;
//     first_name:string;
//     second_name:string;
//     third_name:string;
//     last_name:string;
//     name:string;
//     childs_count:number;

//     child:this[];
// }
declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.scss']
})
export class CommentsComponent implements OnInit,OnChanges {
    
    @Input() itemid:number=0;
    @Input() type:string="comments";
     currentComment:any={};
     newReply:any={};
    newRate:number=5;
    public sliderResponse={"draw": 0,
                    "recordsTotal": 0,
                    "recordsFiltered": 0,
                    "data":[],
                    };
    sliderRequest={
                    "draw": 0,
                    "length": 3,
                    "start": 0,
                    "columns": [
                            {
                            "data": "created_at",
                            "name": "created_at",
                            "orderable": true
                            },
                            {
                            "data": "rate",
                            "name": "rate",
                            "orderable": true
                            },
                        ],
                    'order':null,
                    };

    orders=[
                {
                    'for':'comments',
                    'list':[
                                {'name':'Newest Comment','orders':[{'column':0,'dir':'desc'}]},
                                {'name':'Oldest Comment','orders':[{'column':0,'dir':'asc'}]},
                            ]
                },
                {
                    'for':'reviews',
                    'list':[
                                {'name':'Newest Rerviews','orders':[{'column':0,'dir':'desc'}]},
                                {'name':'Oldest Rerviews','orders':[{'column':0,'dir':'asc'}]},
                                {'name':'Highest Rerviews','orders':[{'column':1,'dir':'desc'}]},
                                {'name':'Lowest Rerviews','orders':[{'column':1,'dir':'asc'}]},
                            ]
                },
            ]
    orderList=[]; 
    
    selectedSort:any={};
    env=environment;
    constructor(
        public shared :SharedService,
        private call:CallapiService,
        public translate:TranslateService,
        private router:Router,
    ){
       
    }

    ngOnInit():void{
        this.orderList=this.orders.filter(a=>a.for==this.type)[0].list;
        this.selectedSort=this.orderList[0];

        this.reloadComments();
        //this.jQuaryRate();
    }
    
    addRate(){
        this.call.postRequest("/CommentsReviews/AddRate" ,{'user_id':this.shared.getUser().id,"item_id":this.itemid,"rate":this.newRate},
        next=>{
            
        });

    }

    sort(order:any){
        this.selectedSort=order;
        this.sliderRequest.order=order.orders;
        this.sliderRequest.start=0;
        this.sliderRequest.draw=0;
        this.reloadComments();
    }
    reloadComments(parent:any=null){
        this.sliderResponse={"draw": 0,
                            "recordsTotal": 0,
                            "recordsFiltered": 0,
                            "data":[],
                            };
        let method="AllComments";
         if(this.type=="reviews"){
            method="AllReviews"
         }
        this.call.postRequest("/CommentsReviews/" + method + "?item_id=" + this.itemid + (parent==null?"":"&parent_id="+parent.id),this.sliderRequest,
        next=>{
            this.sliderResponse=next;
            //this.sliderResponse.draw++;
        });
    }

    newComment(subid:number,parent:any=null){
        this.currentComment={};
        
        if(parent!=null){
            this.currentComment.parent_comment_id=parent.id;}
            this.currentComment.subid=subid;
     
    }
    loadComments(parent:any=null){
        let method="AllComments";
         if(this.type=="reviews"){
            method="AllReviews"
         }
          
        this.call.postRequest("/CommentsReviews/" + method + "?item_id="+this.itemid+(parent==null?"":"&parent_id="+parent.id),(parent==null)?this.sliderRequest:parent.sliderRequest,
        response=>{
            if(parent==null){
                response.data.forEach(itm=>{this.sliderResponse.data.push(itm)});
            }else{
                if(parent.childs==undefined) parent.childs=[];
              
                //parent.sliderRequest.draw++;
                
                response.data.forEach(itm=>{parent.childs.push(itm)});
            }
            //this.sliderResponse.draw++;
        });
    }

    loadMore(parent:any=null){
        if(parent==null){
            this.sliderRequest.draw++;
            this.sliderRequest.start+=this.sliderRequest.length;
        }else{
            if(parent.sliderRequest==undefined)
                parent.sliderRequest={
                    "draw": 0,
                    "length": 3,
                    "start": 0,
                    };
            parent.sliderRequest.draw++;
            parent.sliderRequest.start+=this.sliderRequest.length;
        }
        this.loadComments(parent);
    }

    addComment(parent:any=null){
        if(this.shared.getUser()==null || this.shared.getUser()==undefined){
            this.router.navigate([{outlets:{modal:['login']}}]);
            return;
        }

        let method="AddComment";
        if(this.type=="reviews"){
           method="AddReview"
           this.addRate();
        }
        this.currentComment.item_id=this.itemid;
        this.currentComment.user_id=this.shared.getUser().id;
        this.currentComment.is_review=(this.type=="review")?true:false;

        this.call.postRequest("/CommentsReviews/" + method ,this.currentComment,
        res=>{
            this.currentComment={};
            this.call.postRequest("/CommentsReviews/item/" + res.id ,"",
            next=>{
                    if(parent==null){
                        this.sliderResponse.data.push(next);
                    }else{
                        parent.childs_count++;
                        if(parent.childs==undefined) parent.childs=[];
                        parent.childs.push(next);
                    }
                }
            );
        });
    }
    addReply(parent:any=null){
        if(this.shared.getUser()==null || this.shared.getUser()==undefined){
            this.router.navigate([{outlets:{modal:['login']}}]);
            return;
        }

        let method="AddComment";
        if(this.type=="reviews"){
           method="AddReview"
           this.addRate();
        }
        this.newReply.item_id=this.itemid;
        this.newReply.user_id=this.shared.getUser().id;
        this.newReply.is_review=(this.type=="review")?true:false;

        this.call.postRequest("/CommentsReviews/" + method ,this.newReply,
        res=>{
            this.newReply={};
            this.call.postRequest("/CommentsReviews/item/" + res.id ,"",
            next=>{
                    if(parent==null){
                        this.sliderResponse.data.push(next);
                    }else{
                        parent.childs_count++;
                        if(parent.childs==undefined) parent.childs=[];
                        parent.childs.push(next);
                    }
                }
            );
        });
    }

    ngOnChanges():void{
        this.ngOnInit();
    }
}
