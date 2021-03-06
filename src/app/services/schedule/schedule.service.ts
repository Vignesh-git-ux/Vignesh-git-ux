import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisplayGroupresponse, PSCItem } from 'src/app/models/displayGroup';
import { DisplayModifyScheduleResponse, DisplayScheduleResponse, fetchDEIResponse } from 'src/app/models/displaySchedul';
import { AddScheduleRequest, DeleteSchRequest, fetchDEIScheduleRequest, ModifyScheduleRequest, ScheduleRequest } from 'src/app/models/schedule';
import { APIRequestService } from '../apirequest.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private SCHEDULE_API_URL = "psc";
  airlineScheduleData: any;
  airlineDeiInfo: any;
  pscItemNumber: any;
  currentSchedule: any;
  isAddSchedule: boolean = false;
  grouppId: string = "";
  version: string = "";
  constructor(private apiRequestService: APIRequestService, private httpClient: HttpClient) { }

  public dispSchedule(pscItemNumber: string, callBack: Function): void {
    // pscItemNumber = "20210226GRP000031/V0008/PSC010"          

    if (pscItemNumber != "") {
      let schedule = new ScheduleRequest("DISPPSC", pscItemNumber);
      this.currentSchedule = schedule
      this.apiRequestService.sendPostRequest(this.SCHEDULE_API_URL, schedule, callBack, DisplayScheduleResponse.prototype);
    }
  }

  public fetchDeiInfo(callBack: Function): void {
    let schedule = new fetchDEIScheduleRequest("DEIINFO");
    this.currentSchedule = schedule
    this.apiRequestService.sendPostRequestforDeiData(this.SCHEDULE_API_URL, schedule, callBack, fetchDEIResponse.prototype);
  }

  public dispScheduleModify(pscItemNumber: string, dataObject: any, callBack: Function): void {
    // pscItemNumber = "20210226GRP000031/V0008/PSC010"          
    if (pscItemNumber != "") {
      let GRPID = pscItemNumber.split('/')[0];
      let VER = pscItemNumber.split('/')[1];
      let schedule = new ModifyScheduleRequest("MODPSC", pscItemNumber, GRPID, VER);
      let requestBody = {
        Header: { ...schedule },
        Data: [dataObject]
      }
      this.apiRequestService.sendPostRequest(this.SCHEDULE_API_URL, requestBody, callBack, DisplayModifyScheduleResponse.prototype);
    }
  }

  public dispScheduleAdd(dataObject: any, callBack: Function): void {

    let schedule = new AddScheduleRequest("ADDPSC", this.grouppId, this.version, "0001");
    let requestBody = {
      Header: { ...schedule },
      Data: [dataObject]
    }
    this.apiRequestService.sendPostRequest(this.SCHEDULE_API_URL, requestBody, callBack, DisplayModifyScheduleResponse.prototype);
  }

  public deletePSC(deleteSch: DeleteSchRequest, callBack: Function): void {
    this.apiRequestService.sendDeleteRequest(this.SCHEDULE_API_URL, deleteSch, callBack, DisplayScheduleResponse.prototype);
  }

  get IsAddSchedule(): boolean {
    return this.isAddSchedule;
  }

  set IsAddSchedule(value) {
    this.isAddSchedule = value;
  }

  get grpId(): string {
    return this.grouppId;
  }

  set grpId(value) {
    this.grouppId = value;
  }

  get vers(): string {
    return this.version;
  }

  set vers(value) {
    this.version = value;
  }
}
