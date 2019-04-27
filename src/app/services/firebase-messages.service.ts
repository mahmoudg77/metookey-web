import { CallapiService } from './callapi.service';
import { Injectable }          from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'firebase/messaging';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

@Injectable()
export class FirebaseMessagesService {

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)
   

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
              private shared:SharedService,
              private router:Router,
              private call:CallapiService
              ) { }


  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;
      this.call.postRequest("/User/SaveNewDeviceID?device_id="+token,"",null);
      //const data = { [user.uid]: token }
      //this.db.object('fcmTokens/').update(data)

    })
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        // console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        //console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    receiveMessage() {
       this.messaging.onMessage((payload) => {
          // console.log("Message received. ", payload);
          this.shared.notify(payload.notification.body,payload.notification.title,()=>{
            if(payload.notification.data){
              this.router.navigateByUrl(payload.notification.data.link);
            }
          });
          this.currentMessage.next(payload)
         
          
      });

    }
}