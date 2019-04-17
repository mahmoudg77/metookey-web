import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {

  constructor(public afAuth: AngularFireAuth){}

  loginWithNetwork(socialPlatform:string){
    if(socialPlatform == "facebook"){ 
      return this.doFacebookLogin();
    }
    else if(socialPlatform == "google"){ 
      return this.doGoogleLogin();
    }
    else if (socialPlatform == "twitter") {
      return this.doTwitterLogin();
    }
  }
  
    doFacebookLogin(){
      return new Promise<any>((resolve, reject) => {
          let provider = new firebase.auth.FacebookAuthProvider();
          this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
            resolve(res);
          }, err => {
            console.log(err);
            reject(err);
          })
        })
    }

    doGoogleLogin(){
      return new Promise<any>((resolve, reject) => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
      })
    }

    doTwitterLogin(){
      return new Promise<any>((resolve, reject) => {
          let provider = new firebase.auth.TwitterAuthProvider();
          this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
            console.log(res);
            resolve(res);
          }, err => {
            
            reject(err);
          })
        })
    } 
    
    
}
