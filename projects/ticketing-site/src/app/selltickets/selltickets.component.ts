import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BmtServices } from '../services/bmt.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessmodalComponent } from '../modal/successmodal/successmodal.component';
import { FailuremodalComponent } from '../modal/failuremodal/failuremodal.component';

@Component({
  selector: 'app-selltickets',
  templateUrl: './selltickets.component.html',
  styleUrls: ['./selltickets.component.css']
})
export class SellticketsComponent {
  addEventFormGroup: FormGroup;
  formSubmitted = false;
  addEventReturnData: any;
  eventName:any;
  noOfTickets:any;
  price:any;

  constructor(private fb:FormBuilder, private service: BmtServices, private modalService: BsModalService, private bsModalRef: BsModalRef){
    this.addEventFormGroup = this.fb.group({
      eventName: [[], [Validators.required]],
      noOfTickets: [[], [Validators.required]],
      price: [[], [Validators.required]]
    });
  }

  get f() { return this.addEventFormGroup.controls; }

  addEventData = (data: {
    eventName: any;
    noOfTickets: any;
    price: any;
  }) => {
    console.log("Inside add functionality : "+data);
    this.formSubmitted = true;
    if (this.addEventFormGroup.invalid) {
      return;
    }
    
    this.service.saveEventData(data).subscribe(data => {
      this.addEventReturnData = Number(data);
      console.log("Checking data : "+ this.addEventReturnData);
      if (this.addEventReturnData > 0) {
        const initialState: ModalOptions = {
          initialState: {
            title: 'Successfully Added'
            //formDataToEdit: formDataToEdit

          },
          class: 'modal-dialog-centered',
          backdrop: true,
          ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(SuccessmodalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cancel';
        this.formSubmitted = false;
      } else if (this.addEventReturnData == -1) {
        const initialState: ModalOptions = {
          initialState: {
            title: 'Failed to save : Duplicate Record'
            //formDataToEdit: formDataToEdit

          },
          class: 'modal-dialog-centered',
          backdrop: true,
          ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(FailuremodalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cancel';
        this.formSubmitted = false;

      } else {
        const initialState: ModalOptions = {
          initialState: {
            title: 'Failed to save'
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
    this.addEventFormGroup.setValue({
      idForm: "",
      reportName: "",
      reportDesc: "",
      enable: "",
      noOfDays: ""
    });
  }

}
