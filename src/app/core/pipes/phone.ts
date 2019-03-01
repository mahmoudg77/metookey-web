import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform{
    transform(val, args) {
        if(val==undefined) return '';
        val = val.charAt(0) != '+' ? '+' + val : '' + val;
        let newStr = '';

        for(var i=0; i < (Math.floor(val.length/3) - 1); i++){
           newStr = newStr+ val.substr(i*3, 3) + ' ';
        }
        return newStr+ val.substr(i*3);
    }
}