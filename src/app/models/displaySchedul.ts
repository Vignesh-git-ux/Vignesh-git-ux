import { ModelObject } from "./ModelObject";
import { ModifyScheduleResponse, ScheduleResponse } from "./schedule";

export class DisplayScheduleData  {
    
    ArrivalCity !: string;
    CreAgntSine !: string;
    OperationalSuffix!: string;
    FreqRate!: string;
    AirlineCC!: string;
    CockpitCrewEmp!: string;
    CreAgntDuty!: string;
    GSISK!: string;
    CreDteTime!: string;
    PSCAction!: string;
    FltNum!: string;
    DEIInformation!: string;
    OnwardFltInfo!: string;
    SK!: string;
    AircraftConfig!: string;
    OprAirlineDiscl!: string;
    EqpSerType!: string;
    PaxSTA!: string;
    MealSerNote!: string;
    STDDteTimeVar!: string;
    LSI1SK!: string;
    SchEffDate!: string;
    AircraftType!: string;
    CreAgntID!: string;
    PaxSTD!: string;
    SegTrafficRestr!: string;
    DepartureCity!: string;
    SchDisDate!: string;
    CreAgntAirport!: string;
    LegSeqNum!: string;
    SchFrequency!: string;
    JointOprAirline!: string;
    GSI1PK!: string;
    STADteTimeVar!: string;
    PRBD!: string;
    CabinCrewEmp!: string;
    AircraftSTA!: string;
    AircraftOwner!: string;
    AircraftSTD!: string;
    PK!: string;
    PRBM!: string;
    TimeMode !: string;
    GSI1SK: any;
    ModAgntDuty: any;
    ModAgntID: any;
    ModAgntSine: any;
    ModDteTime: any;
    ModAgntAirport!: string;
    ResponseText: string ="";

    getTimeFormat(number:string) : string {
        if (number) {
            return number.substr(0,2) + ":" + number.substr(2, 2);
        }
        return "";
    }
}

export class DisplayScheduleResponse extends ModelObject {
    
    Header : ScheduleResponse = new ScheduleResponse();
    Data : Array<DisplayScheduleData[]> = new Array<DisplayScheduleData[]>();

    public convertJsonToModel() : void {
      
        Object.setPrototypeOf(this.Header, ScheduleResponse.prototype);
        if (this.Data &&  this.Data.length > 0) {
          this.Data.forEach(data => {
            if (data && data.length > 0) {
              data.forEach(element => {
                Object.setPrototypeOf(element, DisplayScheduleData.prototype);
              });
            }
          });
        }
    }
}

export class fetchDEIResponse extends ModelObject {
      
  Header:any;
  Data:any;

  public convertJsonToModel() : void {
    
      Object.setPrototypeOf(this.Header, ScheduleResponse.prototype);
      if (this.Data &&  this.Data.length > 0) {
        this.Data.forEach((data: any[]) => {
          if (data && data.length > 0) {
            data.forEach((element: any) => {
              Object.setPrototypeOf(element, DisplayScheduleData.prototype);
            });
          }
        });
      }
  }
}


export class DisplayModifyScheduleResponse extends ModelObject {
    
  // Header : ScheduleResponse = new ModifyScheduleResponse();
  // Data : Array<DisplayScheduleData[]> = new Array<DisplayScheduleData[]>();
  Header:any;
  Data:any;

  public convertJsonToModel() : void {
    
      Object.setPrototypeOf(this.Header, ModifyScheduleResponse.prototype);
      if (this.Data &&  this.Data.length > 0) {
        this.Data.forEach((data: any[]) => {
          if (data && data.length > 0) {
            data.forEach((element: any) => {
              Object.setPrototypeOf(element, DisplayScheduleData.prototype);
            });
          }
        });
      }
  }
}