import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'limit'})
export class LimitPipe implements PipeTransform {
  transform(value:any[],limit:number,offset:number=0): number[] {
     var retuned=[] ;

    for (var i = offset; i < limit+offset; i++) {
      retuned.push(value[i]);
    }
    return retuned;
  }
}