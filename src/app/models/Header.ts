import { User } from "./user";

export interface Header {

    AgentID : string;
    AgentSine : string;
    AirportCode :string;
    DutyCodeID :string;
}

export class RequestHeader implements Header {
    
    TransactionType !: string;
    AgentID !: string;
    AgentSine !: string;
    AirportCode !: string;
    DutyCodeID !: string;
    
    constructor(TransactionType:string) {
        let user: User = JSON.parse(localStorage.getItem("LoggedInUser") || '');
        this.AgentID =   user.AgentID;
        this.AgentSine =  user.AgentSine;
        this.AirportCode = user.AirportCode;
        this.DutyCodeID =  user.DutyCodeID;
        this.TransactionType = TransactionType;
    }
}

export class ModifyRequestHeader implements Header {
    
    GRPID!:string;
    VER!:string;
    TransactionType !: string;
    AgentID !: string;
    AgentSine !: string;
    AirportCode !: string;
    DutyCodeID !: string;

    constructor(TransactionType:string) {
        let user: User = JSON.parse(localStorage.getItem("LoggedInUser") || '');

        this.AgentID =   user.AgentID;
        this.AgentSine =  user.AgentSine;
        this.AirportCode = user.AirportCode;
        this.DutyCodeID =  user.DutyCodeID;
        this.TransactionType = TransactionType;
    }
}

export interface ResponseHeader extends Header {
    AgentID : string;
    AgentSine : string;
    AirportCode : string;
    DutyCodeID : string;
   
    HDRResponseCode : string;
    ResponseText : string;
    TransactionType : string;
}
