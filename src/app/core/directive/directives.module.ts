import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetDirective } from './widget/widget.directive';
import { NoImage } from './no-image';
import { OnlyNumber } from './only-number';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WidgetDirective,
    NoImage,
    OnlyNumber
  ],
  exports: [ 
      WidgetDirective,
      NoImage,
      OnlyNumber
  ]
})
export class DirectivesModule { }
