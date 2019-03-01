import { CookieService } from 'ngx-cookie-service';
import { CallapiService } from '../../services/callapi.service';
import { SharedService } from '../../services/shared.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'ms-logout-session',
    exportAs:'modal',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    ngOnInit(): void {
        this.logout();
    }

    constructor(private route: Router,
        private shared: SharedService,
        private call: CallapiService,
        private title: Title,
        private location: Location,
        private cookie:CookieService) {
           
    }

    logout() {
        this.call.getRequest('/User/Logout', '',
                next => {
                     
                        console.log('next', next);
                        //if (next == true) {
                            this.shared.setUser(null);
                            this.shared.setToken(null);
                            //localStorage.setItem('token', null);
                            this.cookie.deleteAll();
                            localStorage.clear();
                            this.route.navigate(['/']);
                        // }else{
    
                        // }
                    },
                error=>
                  {
                    this.shared.setUser(null);
                    this.shared.setToken(null);
                    this.cookie.deleteAll();
                    //localStorage.setItem('token', null);
                    localStorage.clear();
                    this.route.navigate(['/']);
                }
            )
    
    }

    // ngOnInit() {
    //     this.title.setTitle("Logout");
    // }

    // logoutBack() {
    //     this.location.back();
    // }

    // logoutConfirm() {
    //     this.call.getRequest('/User/Logout', '',
    //             next => {
                     
    //                     //console.log('next', next);
    //                     //if (next == true) {
    //                         this.shared.setUser(null);
    //                         this.shared.setToken(null);
    //                         localStorage.setItem('token', null);
    //                         localStorage.clear();
    //                         this.router.navigate(['/']);
    //                     // }else{

    //                     // }
    //                 },
    //             error=>
    //               {
    //                 this.router.navigate(['/']);
    //             }
    //         )

    // }



}
