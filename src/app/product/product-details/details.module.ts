import { RouterModule } from '@angular/router';
import { DirectivesModule } from './../../core/directive/directives.module';
import { CommentsModule } from './../../comments/comments.module';
import { PipesModule } from './../../core/pipes/pipes.module';
import { RangePipe } from './../../core/pipes/range';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemChartModule } from './../../item-chart/item-chart.module';
// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { ProductDetailsComponent } from './details.component';
import { TranslateModule } from '@ngx-translate/core';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { ShareButtonsModule } from 'app/share-buttons/share-buttons.module';

@NgModule({
    imports: [
        ItemChartModule,
        CommonModule,
        FormsModule, 
        PipesModule,
        CommentsModule ,
        DirectivesModule,
        RouterModule,
        TranslateModule,  
        JwSocialButtonsModule ,
        ShareButtonsModule
    ],
    declarations: [
        ProductDetailsComponent,
       
    ],
    exports: [
        ProductDetailsComponent
    ]
})
export class DetailsModule {

}
