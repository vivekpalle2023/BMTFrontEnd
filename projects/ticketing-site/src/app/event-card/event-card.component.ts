import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { tkteventdetails } from '../model/tkteventdetails';
import { tkeventmodel } from '../model/tkteventmodel';
import { BmtServices } from '../services/bmt.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PurchasemodalComponent } from '../modal/purchasemodal/purchasemodal.component';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {

  eventData: any = [];
  status: String = "";
  modalRef!: BsModalRef;
  firstname: any;
  emailId: any;
  inprogressData: any;


  //@Input() eventData: any[] = [];

  constructor(private router: Router, private service:BmtServices, private modalService: BsModalService, private authenticationService: AuthenticationService) { }

  tktevents=tkteventdetails;

  eventdetails: tkeventmodel = {eventid:0,eventname:"",price:0};
  
  // BuyTicket(event: MouseEvent, eventID:number,eventName:string,eventPrice:number) {
    
  //   this.eventdetails.eventid=eventID;
  //   this.eventdetails.eventname = eventName;
  //   this.eventdetails.price=eventPrice;
  // }

  cardno: number = 0;
  onrecieved(carddetails: any) {
    this.cardno = carddetails[0].mycardno;
 
  }

  ngOnInit(): void {
    this.service.getEvents().subscribe(data => {
      this.eventData = data;
      console.log("Event Data : "+ this.eventData);
    });

    const user = this.authenticationService.userValue;
        this.firstname = user?.firstname;
        this.emailId = user?.emailId;
        //this.isLoggedIn = this.authenticationService.isUserLoggedIn();
  }
  

  // buyTicket(selectedEventData : any) {
  //   this.service.purchaseTicket(selectedEventData).subscribe(data => {
  //     this.status = data;
  //     if (this.staticFormTabs?.tabs[2]) {
  //       this.staticFormTabs.tabs[2].active = true;
  //     }
  //   });
  //  }


  openPurchaseModal(selectedEventData: any) {

    this.service.initiatePurchaseStatus(selectedEventData.eventId, this.emailId).subscribe(data => {
      this.inprogressData = data;
      console.log("Event Expiry Time : "+ this.inprogressData.orderId);

      const initialState: ModalOptions = {
        initialState: {
          title: 'Purchase Ticket',
          selectedEventData: selectedEventData,
          emailId: this.emailId,
          inprogressData : this.inprogressData
        },
        class: 'modal-dialog-centered',
        backdrop: true,
        ignoreBackdropClick: true
      };
      this.modalRef = this.modalService.show(PurchasemodalComponent, initialState);
      this.modalRef.content.closeBtnName = 'Cancel';
    });

    
  }

}
