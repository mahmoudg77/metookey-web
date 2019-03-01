import { SharedService } from './../services/shared.service';
import { CallapiService } from './../services/callapi.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


class PasswordEditRequest{
    current:string;
    password:string;
    cpassword:string;
}
@Component({
    moduleId: module.id,
    selector: 'user-password',
    templateUrl: 'user-password.component.html',
    styleUrls: ['user-password.component.scss']
})
export class UserPasswordComponent  {
    request=new PasswordEditRequest();
    form: FormGroup;

    constructor(
        private call:CallapiService,
        private shared:SharedService,
        private formBuilder: FormBuilder,

    ){
        this.form = this.formBuilder.group({
            Ctrl_current: ['', Validators.compose([Validators.required])],
            Ctrl_password: ['', Validators.compose([Validators.required,Validators.min(6)])],
            Ctrl_cpassword: ['', Validators.compose([Validators.required,Validators.min(6)])],
        });

    }

    savePassword(){
        this.call.postRequest("/User/ChangePassword",this.request,
        next=>{
            this.shared.success("Password Changed Success");
            this.request=new PasswordEditRequest();
            this.form.reset();
        },
        error=>{
            this.shared.error(error);
        })
    }
}


