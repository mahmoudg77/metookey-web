import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
  constructor() { }
  private secretKey="Hz8ECE6c5CJXQv2cr7iZLYQC2VK3JXbW9Ha3JHg9RinTgNZubjM4x9EcYmqkpebVFWWVKssUn4CG6dQi";

  //The set method is use for encrypt the value.
  encr(value){
    var key = CryptoJS.enc.Utf8.parse(this.secretKey);
    var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  decr(value){
    var key = CryptoJS.enc.Utf8.parse(this.secretKey);
    var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}