 export class Account{
    name:string;
    company:string;
    balance:number;
    city:string;
    state:number;

    constructor(name:string="",company:string="",balance:number=0,city:string="",state:number=0){
        this.name=name;
        this.company=company,
        this.balance=balance;
        this.city=city;
        this.state=state;
    }
    
    
}