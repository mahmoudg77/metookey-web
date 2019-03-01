import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'range'})
export class RangePipe implements PipeTransform {
  transform(value:number[],nto:number,nfrom:number=1): number[] {
     value=[] ;
    for (var i = nfrom; i <= nto; i++) {
        value.push(i);
    }
    return value;
  }
}