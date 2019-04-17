import { FirebaseMessagesService } from './services/firebase-messages.service';
import { AuthService } from './services/auth.service';
import { Meta } from '@angular/platform-browser';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { CallapiService } from './services/callapi.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from './services/shared.service';
import { GlobalData } from './services/global-data';
import { environment } from 'environments/environment';
import { NotificationServiceService } from './services/notification-service.service';
import { SEOServiceService } from './services/seoservice.service';


declare var FB:any;
declare var $:any;
@Component({
  selector: 'metookey-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MetookeyAppComponent implements OnInit{
 
  private _router: Subscription;
    header: string;
    currentLang = 'en';
    url: string;
    showSettings = false;
    themeSkinColor: any = "light";
    dark: boolean;
    boxed: boolean;
    collapseSidebar: boolean;
    compactSidebar: boolean;
    customizerIn: boolean = false;
    chatWindowOpen: boolean = false;
    chatSidebar: boolean = false;
    sidebarClosed: boolean = false;
    root = 'ltr';
    chatpanelOpen: boolean = false;
    scrollContainer:any={};
    private _mediaSubscription: Subscription;
    sidenavOpen: boolean = true;
    sidenavMode: string = 'side';
    isMobile: boolean = false;
    private _routerEventsSubscription: Subscription;
    public innerWidth: any;
    public global=GlobalData;//.settings
  public env=environment;
  message: any;
  constructor( public translate: TranslateService, 
    public shared: SharedService, 
    public route: Router,
    private call :CallapiService,
    private currentRoute:ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private meta:Meta,
    public notifyService:NotificationServiceService,
    private seo:SEOServiceService,
    public auth:AuthService,
    private router:ActivatedRoute,
    private messagingService: FirebaseMessagesService

    ) {

    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');

    const browserLang: string =localStorage.getItem('lang') || translate.getBrowserLang();

    translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');

    breadcrumbService.addFriendlyNameForRoute('/', '');
    breadcrumbService.addFriendlyNameForRoute('/search/(.*)', 'Search');

    this.call.loadSettings();

    this.url=this.route.url;
    //this.checkLogin();

    shared.asFrame=false;
  }

 
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
  changeLang(curr:string){
    this.translate.use(curr);
    //this.call.loadLocale();
    localStorage.setItem('lang',curr);

  }

  

  ngOnInit() {
    
    // var doCheck=true;
    // this.router.queryParams.subscribe(params=>{
    //   console.log("User Token=",params);
    //  const token=Guid.parse(params['user_token']);
    //     if(token!=null){
    //       this.shared.setToken(token.toString());
    //     }else{
    //       this.shared.error("Invalid Token !");
    //       doCheck=false;
    //     }

    // },
    // ()=>{
    //   if(doCheck)
    // }
    // )
   

         this.auth.checkLogin(
           next=>{
             console.log(window.location.href);
             if(window.location.href.indexOf('/create-order-mobile')>0) return;

            this.messagingService.getPermission()
            this.messagingService.receiveMessage()
            this.messagingService.currentMessage.next(payload=>{
              //console.log(payload);
              this.shared.success(payload.body);
              // this.shared.notify(payload.body,payload.notification.title,next=>{
              //   this.route.navigateByUrl(payload.data.link);
              //   }
              // );
            })
           }
         );
    //Load global data
    

     GlobalData.host=environment.mediaServer;

     $("#layout").prop("href",this.shared.getCssStyle());

    //  firebase.initializeApp(environment.firebase);

    //  this.fb.onMessage(
    //    data =>{
    //      this.route.navigateByUrl(data.route);
    //    }
    //  );

    //  this.fb.onTokenRefresh(
    //   (token: string) => {
    //     if(this.auth.getIfLoggedIn())
    //         this.saveNewDeviceID(token);
    //  });
  

    
  }

  logout() {
    this.notifyService.stop();
    this.call.getRequest('/User/Logout', '',
            next => {
                        this.notifyService.stop();
                        this.shared.setUser(null);
                        this.shared.clearToken();
                        this.shared.roles=[];
                        this.route.navigate(['/']);
                        
                    },
            error=>
                    {
                      this.notifyService.stop();
                      this.shared.setUser(null);
                      this.shared.clearToken();
                      this.shared.roles=[];
                      this.route.navigate(['/']);
                  }
        )

}

saveNewDeviceID(device_id:string,fnNext:any=null,fnError:any=null) {
  this.call.postRequest("/User/SaveNewDeviceID?device_id="+device_id,"",
          next => { 
                      if(fnNext) fnNext(next);
                  },
          error=>
                  {
                    if(fnError) fnError(error);
                }
      );
}

}
