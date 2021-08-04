import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIRequestService } from '../apirequest.service';
import { GroupRequest, GroupResponse } from 'src/app/models/group';
import { DisplayGroupresponse } from 'src/app/models/displayGroup';
import { AgentGroupData, AgentGroupresponse } from 'src/app/models/agentGroup';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private GROUP_API_URL = "grp";
  
  constructor(private apiRequestService : APIRequestService,
     private httpClient: HttpClient) {}

  createNewGroup(callBack : Function) : void {
    
      this.apiRequestService.sendPostRequest(this.GROUP_API_URL, 
                                             new GroupRequest("NEWGRP","","","",""),
                                             callBack, GroupResponse.prototype);
  }

  getAgentGroup(dispOption : string, callBack : Function) : void {
    
    this.apiRequestService.sendPostRequest(this.GROUP_API_URL, 
                                           new GroupRequest("AGTGRP","","","", dispOption),
                                           callBack, AgentGroupresponse.prototype);
}

  initGroup(grpResp:AgentGroupData, callBack : Function) : void {
    
      this.apiRequestService.sendPostRequest(this.GROUP_API_URL, 
                                             new GroupRequest("INITGRP", grpResp.VerNum, grpResp.getGRPID(),"Y",""), 
                                             callBack, GroupResponse.prototype);
  }

  dispGroup(grpId : string, verNum : string, callBack : Function):void {
   
      this.apiRequestService.sendPostRequest(this.GROUP_API_URL, 
                                             new GroupRequest("DISPGRP",verNum, grpId,"",""), 
                                             callBack, DisplayGroupresponse.prototype);
  }
}
