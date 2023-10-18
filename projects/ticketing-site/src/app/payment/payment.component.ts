import { Component, EventEmitter, Input, Output } from '@angular/core';
import { carddetails } from '../model/carddetails';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor() { }

  @Input() eventdetailsforpayment: any;

  cardnumber: number = 0;
  carddate: string = "";

  oncardnoinput(cardnumber: string) {
    this.cardnumber = parseInt(cardnumber);
  }
  oncarddate(carddate: string) {
    this.carddate = carddate;
  }

  mycarddetails: carddetails = { mycardno: 123456789, mycarddate: "", trasactionstatus: "" }

  @Output()
  recieved: EventEmitter<carddetails> = new EventEmitter<carddetails>();

  onpay(event: MouseEvent) {

    this.recieved.emit(this.mycarddetails);

    if (this.mycarddetails.mycardno == this.cardnumber) {

      this.mycarddetails.trasactionstatus = "Payment Successfull for " + this.eventdetailsforpayment.eventname;
    }
    else {
      this.mycarddetails.trasactionstatus = "Ivalid Card details entered";
    }
   
  }


}
