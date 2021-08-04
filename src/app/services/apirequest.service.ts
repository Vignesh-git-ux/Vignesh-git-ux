import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from 'protractor';
import { throwError } from 'rxjs';
import { ModelObject } from '../models/ModelObject';

@Injectable({
  providedIn: 'root'
})
export class APIRequestService {

  private REST_API_SERVER = "https://tcga2jn4b7.execute-api.us-east-2.amazonaws.com/v1/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public sendPostRequest(url : string, body:any, callBack:Function, prototype:any){
  
    this.httpClient.post(this.REST_API_SERVER + url, body, this.httpOptions)
        .subscribe(data => {           
          Object.setPrototypeOf(data, prototype);
          (<ModelObject> data).convertJsonToModel();
          callBack(data);
    });
  }

  public sendPostRequestforDeiData(url : string, body:any, callBack:Function, prototype:any){
  
    this.httpClient.post(this.REST_API_SERVER + url, body, this.httpOptions)
        .subscribe(data => {           
          Object.setPrototypeOf(data, prototype);
          (<ModelObject> data).convertJsonToModel();
          callBack(data);
    });
  }


  public sendGetRequest(url : string, callBack:Function){
  
    this.httpClient.get<any>(this.REST_API_SERVER, this.httpOptions)
      .subscribe(data => {
        callBack(data);
    });
  }

  public sendDeleteRequest(url : string, body:any, callBack:Function, prototype:any){
    
    let options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      body : body
    };

    this.httpClient.delete(this.REST_API_SERVER + url, options)
        .subscribe(data => { 
          Object.setPrototypeOf(data, prototype);
          callBack(data);
    });
  }
}
