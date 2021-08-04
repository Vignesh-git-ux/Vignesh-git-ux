import { RequestHeader, ResponseHeader } from "./Header";
import { ModelObject } from "./ModelObject";

export class GroupRequest extends RequestHeader {
    
    VerNum : string = "";
    GRPID : string = "";
    ForceINIT: string = "";
    DispOption: string = "";
    VER: string = "";

    constructor(transactionType:string, verNum:string, grpID:string, forceINIT:string, dispOption:string) {
      
      super(transactionType);
      this.VerNum = verNum;
      this.VER = verNum;
      this.GRPID = grpID;
      this.ForceINIT=forceINIT;
      this.DispOption=dispOption;
    }
}

export class GroupResponse  extends  ModelObject implements ResponseHeader  {
  
  AgentID: string = "";
  AgentSine: string = "";
  AirportCode: string = "";
  DutyCodeID: string = "";
  HDRResponseCode: string = "";
  ResponseText: string = "";
  TransactionType: string = "";

  GRPID : string = "" ;
  VerNum : string = "";
  CreDteTime : string = "";
  CreAgntID : string = "";

  public convertJsonToModel(): void { }
}
  
     