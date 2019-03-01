import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { CallapiService } from 'app/services/callapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'translation-editor',
    templateUrl: 'translation-editor.component.html',
    styleUrls: ['translation-editor.component.scss']
})
export class TranslationEditorComponent implements OnInit {
    data: any;
    keys: string[];
    dtOption:DataTables.Settings={
        pageLength:20,
        serverSide:false,
        columns:[
            {name:'key',orderable:false,searchable:false}
        ]
    };
    constructor(private call:CallapiService,private shared:SharedService,private route:ActivatedRoute){
    
    }
    ngOnInit(): void {
        
            this.loadTranslateFile();
       
    }
    loadTranslateFile() {
        this.call.postRequest("/Language/loadTranslation","",
        next=>{
            this.data=next;
            this.keys=Object.keys(next);
        },
        err=>{
            this.shared.error(err);
        }
        )
    }

    saveTranslateFile() {
        this.call.postRequest("/Language/saveTranslation",this.data,
        next=>{
            if(next)this.shared.success("Save Success");
        },
        err=>{
            this.shared.error(err);
        }
        )
    }

}
