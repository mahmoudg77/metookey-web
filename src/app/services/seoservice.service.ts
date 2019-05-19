import { Title, Meta } from '@angular/platform-browser';
import { Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SEOServiceService {
  
  constructor(private title: Title, private meta: Meta) { }

  titleTag(title: string) {
    this.title.setTitle(title);
    this.metaTag('og:title',title);
  }

  metaTag(name:string,content: string) {
    this.meta.removeTag('property="' + name + '"');
    this.meta.addTag({ property: name, content: content });
  }
  getMetaContent(name:string) {
   return this.meta.getTag('property="' + name + '"').content;
  }


}
