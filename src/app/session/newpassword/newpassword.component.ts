import { CallapiService } from '../../services/callapi.service';
import { SharedService } from '../../services/shared.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'newpassword',
    templateUrl: 'newpassword.component.html',
    styleUrls: ['newpassword.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NewpasswordComponent {

    password: any;
    confirm_password:any;

    constructor(private router: Router, private title: Title,
        private shared: SharedService, private call: CallapiService) {
      }
      ngOnInit() {
        this.title.setTitle("New Password");
      }

      // resetPassword(){
      //   if(this.password == this.confirm_password){
      //   // this.call.postRequest("/POST api/User/ResetPassword?ResetPwdKey={ResetPwdKey}&NewPassword="+this.password, "").subscribe(
      //   //     next=>{
      //   //         if(next.type=="1"){
      //   //             //this.addSenders();
      //   //             //this.mr.close();
      //   //             //console.log(this.email);
      //   //             this.router.navigate(['/']);
      //   //         }else if(next.type=="0"){
      //   //             console.log("bad");
      //   //         }else{console.error(next);}
      //   //     },
      //   //     error=>{console.log("bad req");},
      //   //     ()=>{}
      //   //     )
      //   this.router.navigate(['/session/loginone']);
      //   }
      // }
}
