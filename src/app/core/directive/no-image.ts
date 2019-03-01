import { Directive, Input } from "@angular/core";

@Directive({
    selector: 'img',
    host: {
      '(error)':'noImage($event)',
      '[src]':'src'
     }
  })
  export class NoImage {
    @Input() src:string;
    @Input() err:string="/assets/images/no-image.png";
  
    noImage(e) {
      e.target.src = this.err;
    }
  }