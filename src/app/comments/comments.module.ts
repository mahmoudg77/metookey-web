import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './../core/pipes/pipes.module';
import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CommentsComponent } from './comments.component';

@NgModule({
    imports: [
            CommonModule,
            PipesModule,
            FormsModule,
            TranslateModule

    ],
    declarations: [
        CommentsComponent,
    ],
    exports: [
        CommentsComponent,
    ]
})
export class CommentsModule {

}
