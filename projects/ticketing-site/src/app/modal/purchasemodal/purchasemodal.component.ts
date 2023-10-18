import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { BmtServices } from '../../services/bmt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessmodalComponent } from '../successmodal/successmodal.component';
import { FailuremodalComponent } from '../failuremodal/failuremodal.component';
import { Subscription, timer } from 'rxjs';
@Component({
  selector: 'app-purchasemodal',
  templateUrl: './purchasemodal.component.html',
  styleUrls: ['./purchasemodal.component.css']
})
export class PurchasemodalComponent implements OnInit {
  creditCardGroup: FormGroup;
  selectedEventData: any;
  status: number = 0;
  title?: string;
  closeBtnName?: string;
  purchaseSubmitted = false;
  cvv: any;
  expdate: any;
  noofticket: any;
  emailId: any;
  orderId: any;
  message: any;
  inprogressData: any;
  cancelOrderData: any;
  cancelPurchase: any;

  countDown!: Subscription;
  counter = 10;
  tick = 1000;

  constructor(private service: BmtServices, private fb: FormBuilder, public bsModalRef: BsModalRef, private modalService: BsModalService) {
    this.creditCardGroup = this.fb.group({
      cardNo: [[], [Validators.required]],
      cvv: [[], [Validators.required]],
      expdate: [[], [Validators.required]]
      // noofticket: [[], [Validators.required]]

    });
  }

  ngOnInit(): void {
    this.countDown = timer(0, this.tick).subscribe((count) => {

      if (this.counter == 0 && count) {

        this.service.cancelOrder(this.inprogressData.orderId, this.selectedEventData.eventId, this.emailId).subscribe(data => {
          this.cancelOrderData = data;
          //console.log("Event Expiry Time : " + this.cancelOrderData);


          const initialState: ModalOptions = {
            initialState: {
              title: 'Transaction Timeout'
              //formDataToEdit: formDataToEdit
  
            },
            class: 'modal-dialog-centered',
            backdrop: true,
            ignoreBackdropClick: true
          };
          this.bsModalRef = this.modalService.show(FailuremodalComponent, initialState);
          this.bsModalRef.content.closeBtnName = 'close';
          if (this.countDown) {
            this.countDown.unsubscribe();
          }
          //this.bsModalRef.hide();
        });


        
        
      }
      --this.counter;
    });
  }

  ngOnDestroy() {

    this.countDown.unsubscribe();
  }

  get f() { return this.creditCardGroup.controls; }

  purchaseTickets(data: {
    cardNo: any;
    cvv: any;
    expdate: any;
    emailId: any;
    eventId: any;
    orderId: any;
  }) {

    this.purchaseSubmitted = true;
    if (this.creditCardGroup.invalid) {
      return;
    }

    data.emailId = this.emailId;
    data.eventId = this.selectedEventData.eventId;
    data.orderId = this.inprogressData.orderId;
    this.service.purchaseEventTicket(data).subscribe(data => {
      this.orderId = data.data;
      this.status = data.status;
      this.message = data.message;
      if (this.status == 200) {
        const initialState: ModalOptions = {
          initialState: {
            title: 'Ticket purchased Successfully. Your order Id is :' + this.orderId
            //formDataToEdit: formDataToEdit

          },
          class: 'modal-dialog-centered',
          backdrop: true,
          ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(SuccessmodalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cancel';
      } else {

        this.service.cancelOrder(this.inprogressData.orderId, this.selectedEventData.eventId, this.emailId).subscribe(data => {
          this.cancelOrderData = data;
          console.log("Event Expiry Time : " + this.cancelOrderData);
        });

        const initialState: ModalOptions = {
          initialState: {
            title: 'Transaction Failed .' + this.message
            //formDataToEdit: formDataToEdit

          },
          class: 'modal-dialog-centered',
          backdrop: true,
          ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(FailuremodalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cancel';
      }
    });
  }

  cancelModal(cancelPurchase: any) {
    this.service.cancelOrder(this.inprogressData.orderId, this.selectedEventData.eventId, this.emailId).subscribe(data => {
      this.cancelPurchase = data;
      console.log("Cancelling Ticket Order : " + this.cancelPurchase.message);

      if (this.cancelPurchase.status == 200) {
        const initialState: ModalOptions = {
          initialState: {
            title: 'Ticket Cancelled Successfully'
            //formDataToEdit: formDataToEdit

          },
          class: 'modal-dialog-centered',
          backdrop: true,
          ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(SuccessmodalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cancel';
      } else {
        const initialState: ModalOptions = {
          initialState: {
            title: 'Transaction Failed .' + this.message
            //formDataToEdit: formDataToEdit

          },
          class: 'modal-dialog-centered',
          backdrop: true,
          ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(FailuremodalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cancel';
      }

    });
  }

}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}

