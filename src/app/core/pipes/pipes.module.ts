import { PhonePipe } from './phone';
import { LimitPipe } from './limit';
import { TimeAgoPipe } from 'time-ago-pipe';
import { RangePipe } from './../../core/pipes/range';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';
import { ThousandSuffixesPipe } from './thousand-stuff';
// This Module's Components

@NgModule({
    imports: [
        CommonModule,
        FormsModule,        
        
    ],
    declarations: [
         RangePipe,
         TimeAgoPipe,
         ThousandSuffixesPipe,
         LimitPipe,
         PhonePipe

     ],
     
    exports: [
        RangePipe,
        TimeAgoPipe,
        ThousandSuffixesPipe,
        LimitPipe,
        PhonePipe
    ]
})
export class PipesModule {

}
