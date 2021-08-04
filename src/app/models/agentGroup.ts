import { GroupResponse } from "./group";
import { ModelObject } from "./ModelObject";

export class AgentGroupData  {
    
    TotPSCItem : string= "";
    LSI1SK : string= "";
    CreAgntSine : string= "";
    GrpStatInd : string= "";
    CreAgntID : string= "";
    ModAgntSine : string= "";
    NextAvlPSCID : string= "";
    CreAgntAirport : string= "";
    GSI1SK : string= "";
    ModAgntAirport : string= "";
    GSI2SK : string= "";
    VerNum : string= "";
    ModDteTime : string= "";
    GSI2PK : string= "";
    CreAgntDuty : string= "";
    GSI1PK : string= "";
    ModAgntID : string= "";
    CreDteTime : string= "";
    ModAgntDuty : string= "";
    SK : string= "";
    PK : string= "";

    public getGRPID() : string {
        return this.PK && this.PK.split("#")[1];
    }

    public getGrpIndex() : string {
        return this.LSI1SK && this.LSI1SK.split('#')[1];
    }
}

export class AgentGroupresponse extends ModelObject  {
    
    Header : GroupResponse = new GroupResponse();
    Data : AgentGroupData[] = [];

    public convertJsonToModel() : void {
      
      if (this.Data &&  this.Data.length > 0) {
        this.Data.forEach(data => {
          Object.setPrototypeOf(data, AgentGroupData.prototype);
        });
      }
    }
}