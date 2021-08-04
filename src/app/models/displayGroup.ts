import { DisplayScheduleData } from "./displaySchedul";
import { GroupResponse } from "./group";
import { ModelObject } from "./ModelObject";

export class PSCItem {
    PSCItemNumber: string = "";
    PSCItemIndex:string = "";
    
    public getCarrierCode()  : string {
      
      let fltNo_carr : string = this.PSCItemIndex.split("|")[0];
      if (fltNo_carr) {

        let carrCode : string = fltNo_carr.split("/")[0] as string;
        return carrCode && carrCode.split("#")[1];
      }
      return "";
    }
    public getFlightNo()  : string {

      let fltNo_carr : string = this.PSCItemIndex.split("|")[0];
      return fltNo_carr && fltNo_carr.split("/")[1];
    }
    public getEffectiveDate()  : string {
      let datemap : string = this.PSCItemIndex.split("|")[1];
      if (datemap) {

        let effDate : string = datemap.split("-")[0] as string;
        return effDate && effDate.split("#")[1];
      }
      return "";
    }
    public getDateDiscontinue()  : string {
      let datemap : string = this.PSCItemIndex.split("|")[1];
      if (datemap) {

        let dteDis : string = datemap.split("-")[1] as string;
        return dteDis && dteDis.split("/")[0];
      }
      return "";
    }
    public getOrigin()  : string {
      let sch : string = this.PSCItemIndex.split("|")[3];
      if (sch) {

        let depArr : string = sch.split("#")[1] as string;
        return depArr && depArr.split("/")[0];
      }
      return "";
    }
    public getDestination()  : string {
      let sch : string = this.PSCItemIndex.split("|")[3];
      if (sch) {

        let depArr : string = sch.split("#")[1] as string;
        return depArr && depArr.split("/")[1];
      }
      return "";
    }
    public getAction() : string {
      let act : string = this.PSCItemIndex.split("|")[2];
      return act && act.split("#")[1];
    }
}
export class DisplayGroupData  {
    
    VER: string = "";
    VERStatus: string = "";
    NumberOfItems: string = "";
    PSCItems : PSCItem[] = [];
}

export class DisplayGroupresponse extends ModelObject  {
    
    Header : GroupResponse = new GroupResponse();
    Data : DisplayGroupData[] = [];

    public convertJsonToModel() : void {
      
      if (this.Data &&  this.Data.length > 0) {
        this.Data.forEach(data => {
          Object.setPrototypeOf(data, DisplayGroupData.prototype);
          if (data.PSCItems && data.PSCItems.length > 0) {
            data.PSCItems.forEach(element => {
              Object.setPrototypeOf(element, PSCItem.prototype);
            });
          }
        });
      }
    }
    public getPSCItemNumber() : any {
        
        let pscItems;
        
        if (this.Data && this.Data.length > 0) {
            this.Data.forEach(function(data) {
              if (data.PSCItems && data.PSCItems.length > 0) {
                pscItems = data.PSCItems[0].PSCItemNumber;
                if (data.PSCItems.length > 1) {
                  pscItems = pscItems +  "-" + data.PSCItems[data.PSCItems.length-1].PSCItemNumber;
                } 
              }
            });
        }
 
        return pscItems;
    }
}