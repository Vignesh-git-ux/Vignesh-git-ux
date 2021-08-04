import { ThrowStmt } from "@angular/compiler";
import { ModelObject } from "./ModelObject";

export class UserRequest {

    TransactionType !: string;
    AgentID !: string;
    // Password !: string; 
    AgentSine !: string;
    AirportCode !: string;
    DutyCodeID !: string;
    
    constructor(TransactionType:string, AgentID:string, 
                 AgentSine : string,
                AirportCode : string, DutyCodeID : string) { 
    
        this.TransactionType = TransactionType;
        this.AgentID = AgentID;
        // this.Password = Password;
        this.AgentSine = AgentSine;
        this.AirportCode = AirportCode;
        this.DutyCodeID = DutyCodeID;
    }
}

export class User extends ModelObject {
    

    HDRResponseCode !: string;
    ResponseText !:  string;
    TransactionType !: string;
    
    AgentFirstName !: string;
    AgentLastName !: string;
    ProfilePhoto !: string;
    AgentID !: string;
    AgentSine !: string;
    AirportCode !: string;
    DutyCodeID !: string;
    Mailid !: string;

    public convertJsonToModel(): void {
    }

    setUser() { 
        localStorage.setItem("LoggedInUser", JSON.stringify(this));
    }
}
  
   
