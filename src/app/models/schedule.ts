import { PSCItem } from "./displayGroup";
import { Header, RequestHeader, ResponseHeader } from "./Header";
import { User } from "./user";

export class ScheduleRequest extends RequestHeader {

    TransactionType !: string;
    AgentID !: string;
    AgentSine !: string;
    AirportCode !: string;
    DutyCodeID !: string;
    PSCItemNumber !: string;

    constructor(transactionType:string, pscItemNumber:string) {
        super(transactionType);
        this.PSCItemNumber = pscItemNumber;
    }   
}

export class fetchDEIScheduleRequest extends RequestHeader {

    TransactionType !: string;
    AgentID !: string;
    AgentSine !: string;
    AirportCode !: string;
    DutyCodeID !: string;    

    constructor(transactionType:string) {
        super(transactionType);        
    }   
}

export class ModifyScheduleRequest extends RequestHeader {

    GRPID!:string;
    VER!:string;
    TransactionType !: string;
    AgentID !: string;
    AgentSine !: string;
    AirportCode !: string;
    DutyCodeID !: string;
    PSCID !: string;

    constructor(transactionType:string, pscItemNumber:string,GRPID:string,VER:string) {
        super(transactionType);
        this.PSCID = pscItemNumber;
        this.GRPID = GRPID;
        this.VER = VER;
    }   
}


export class ScheduleResponse implements ResponseHeader {

    AgentID: string = "";
    AgentSine: string = "";
    AirportCode: string = "";
    DutyCodeID: string = "";
    HDRResponseCode: string = "";
    ResponseText: string = "";
    TransactionType: string = "";
    PSCItemNumber : string = "";
    
    public getGRPID() : string {
        return this.PSCItemNumber.split("/")[0];
    }
    public getVerNum() : string {
        return this.PSCItemNumber.split("/")[1];
    }   
}

export class ModifyScheduleResponse implements ResponseHeader {

    GRPID:string="";
    VER:string="";    
    AgentID: string = "";
    AgentSine: string = "";
    AirportCode: string = "";
    DutyCodeID: string = "";
    HDRResponseCode: string = "";
    ResponseText: string = "";
    TransactionType: string = "";
    PSCItemNumber : string = "";
    
    // public getGRPID() : string {
    //     return this.PSCItemNumber.split("/")[0];
    // }
    // public getVerNum() : string {
    //     return this.PSCItemNumber.split("/")[1];
    // }   
}

export class DelSchHeader extends RequestHeader   { 

    GRPID : string = "" ;
    VER : string = "";
    NumberOfItems : string ="";

    constructor(transactionType:string, VER:string, GRPID:string, NumberOfItems:string) {
        super(transactionType);
        this.VER = VER;
        this.GRPID = GRPID;
        this.NumberOfItems=NumberOfItems;
    }
}

export class DeleteSchRequest  {
    
    Header !: DelSchHeader;
    Data : any;

    constructor(Header : DelSchHeader, Data : any) {
      
        this.Header = Header;
        this.Data = Data;
      }
}
  
     