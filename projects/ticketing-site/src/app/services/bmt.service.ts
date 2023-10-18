import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { LoginForm } from '../model/loginForm';

@Injectable({
  providedIn: 'root'
})

export class BmtServices {
  apiUrl = "http://localhost:8084";

  loginForm = new LoginForm();

  constructor(private http: HttpClient) { }

   createAccount = (myAccount:any) =>{
      return this.http.post<any>(this.apiUrl+`/bmt/signup`, myAccount);
      //return this.http.post<any>(this.apiUrl+`/orp/getbrancFromReport`,reportWithBranchIds);
   }

  getTickets(): Observable<any> {
    //access http get call
    //Import httpclientModule in app.module.ts
    return this.http.get(this.apiUrl + "/bmt/getTickets");
  }

  loginService = (userName: string, pwd : string) =>{
    this.loginForm.userName= userName;
    this.loginForm.password = pwd;
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // return this.http.get(this.apiUrl+"/orp/login",{headers,responseType: 'text' as 'json'})
    return this.http.post<any>(this.apiUrl+"/bmt/login",this.loginForm);
  }

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl+"/bmt/getEventList");
  }

  // purchaseTicket = (eventData : any) => {
  //   return this.http.post<any>(this.apiUrl+"/bmt/purchaseTicket",eventData);
  // }

  purchaseEventTicket = (purchaseOrder : any) => {
    console.log("Inside service about to purchase : "+purchaseOrder.emailId);
    return this.http.post<any>(this.apiUrl+"/bmt/purchaseTicket",purchaseOrder);
  }

  initiatePurchaseStatus = (eventId: any, emailId: any) => {
    return this.http.get(this.apiUrl+`/bmt/initiatPurchase?eventId=${eventId}&emailId=${emailId}`);
  }

  cancelOrder= (orderId: any, eventId: any, emailId: any) => {
    return this.http.get(this.apiUrl+`/bmt/cancelOrder?orderId=${orderId}&eventId=${eventId}&emailId=${emailId}`);
  }

  getOrders(emailId:any):Observable<any> {
    return this.http.get(this.apiUrl+`/bmt/myOrders?emailId=${emailId}`);
  }

  saveEventData = (eventData : any) => {
    console.log("Inside service about to add event data : "+eventData.eventName);
    return this.http.post<any>(this.apiUrl+"/bmt/addEvent",eventData);
  }


}

