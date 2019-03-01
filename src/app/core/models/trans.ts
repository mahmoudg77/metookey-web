import { Injectable } from '@angular/core';
@Injectable()
export class trans
{
	public lang:string ;
	public value:string;

	constructor(private _lang:string=null,private _value:string=null){
		this.lang=this._lang;
		this.value=this._value;
	}
}
