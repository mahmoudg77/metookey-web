import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { CallapiService } from 'app/services/callapi.service';
import { PageTitleService } from './../../core/page-title/page-title.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
 
class settingItem{
    id              :number;
    setting_type?   :number = 1;
    /*
        1	Text
        2	TextArea
        3	Checkbox
        4	Select
        5	Radio Button
        6	Checkbox List
    */
    setting_key     :string ;
    setting_name    :string ;
    setting_value?  :string ='';
    datasource_url? :string ='';
    datasource_json?:string ='';
    setting_group   :string ;
    display?        :boolean = true;
    data?           :any[];
    selected?       :any[];
}
@Component({
    moduleId: module.id,
    selector: 'setting',
    templateUrl: 'setting.component.html',
    styleUrls: ['setting.component.scss']
})
export class SettingComponent implements OnInit {
    settings:any[]=[];
    
    constructor(
            private shared:SharedService,
            private call:CallapiService,
            private translate:TranslateService,
            private title:Title
        ){

    }
    
    ngOnInit(): void {
        this.title.setTitle("Settings");
        this.loadSettings();
    }

    loadSettings(){
    this.call.postRequest("/Setting/AllForEdit","",
        next=>{
            this.settings=next;
            // console.log(this.settings.length);
            for (let index=0;index<this.settings.length;index++) {
                this.settings[index].forEach(itm=>{
                //if(!Array.isArray(itm))
                if(itm.setting_type==4 || itm.setting_type==5 || itm.setting_type==6){
                    if(itm.datasource_json!=null && itm.datasource_json!=''){
                        itm.data=JSON.parse(itm.datasource_json);
                    }else if(itm.datasource_url!=null && itm.datasource_url!=''){
                        this.call.postRequest(itm.datasource_url,"",
                            res=>{
                                if("recordsTotal" in res){
                                    itm.data=res.data;
                                }else{
                                    itm.data=res;
                                }
                            }
                        );
                    }
                    itm.selected=itm.setting_value.split(',');
                    //console.log(itm);
                    // var id:number;
                    // console.log(id.toString())
                }
        
             })
            }
        });
    }
    
    toggleSelect(setting:settingItem,id:string){
        setting.selected.forEach(itm=>{
            if((itm||'')=='')
            setting.selected.splice(setting.selected.indexOf(itm),1);
        })
        if(setting.selected.indexOf(id)>-1){
            setting.selected.splice(setting.selected.indexOf(id),1);
        }else{
            if(setting.selected==undefined || setting.selected==null)setting.selected=[];
            setting.selected.push(id);
        }
      
        setting.setting_value=setting.selected.join(',');
        //console.log(setting.setting_value);
    }
    saveSettings(){
        var toSaveSetting=[];
        for (let index=0;index<this.settings.length;index++) {
            this.settings[index].forEach(itm=>{
                toSaveSetting.push(itm);
            });
        }
        this.call.postRequest("/Setting/Edit",toSaveSetting,
        next=>{
            this.shared.success("Setting Saved Success !");
            this.call.loadSettings();
        })
    }
}
