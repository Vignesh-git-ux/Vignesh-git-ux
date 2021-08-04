import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIRequestService } from '../apirequest.service';
import {User, UserRequest} from './../../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private LOGIN_API_URL = "agt";
  
  constructor(private apiRequestService : APIRequestService,
     private httpClient: HttpClient) {}

     login(userName:string,  callBack : Function) : void {
    
      this.apiRequestService.sendPostRequest(this.LOGIN_API_URL, 
                                             new UserRequest("LGNCHK", userName.split("/")[0]
                                             , userName.split("/")[1], userName.split("/")[2],
                                             userName.split("/")[3]),
                                             callBack, User.prototype);
  }
  getUser() : User {
    // let loggedInUser = {
    //   TransactionType: "LGNCHK",
    //   AgentID: "NZKM51",
    //   HDRResponseCode: "000",
    //   ResponseText: "SUCCESS",
    //   AgentSine: "0057A8",
    //   AirportCode: "PTY",
    //   DutyCodeID: "SU",
    //   Mailid: "john.doe@testmail.com",
    //   AgentFirstName: "John",
    //   AgentLastName: "Doe",
    //   ProfilePhoto: "https://adp-airport-maps.s3.amazonaws.com/Agent%20table%20profile%20pictures/NZKM51.jpg"
    // };
    // localStorage.setItem("LoggedInUser", JSON.stringify(loggedInUser));
    return JSON.parse(localStorage.getItem("LoggedInUser") || "{}");
  }
}
