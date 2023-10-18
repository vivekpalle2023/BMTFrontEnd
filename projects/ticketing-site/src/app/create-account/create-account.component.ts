import { Component } from '@angular/core';
import { BmtServices } from '../services/bmt.service';
import { UserLogin } from '../model/userlogin';
import { SignUpDetails } from '../model/signupdetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuccessmodalComponent } from '../modal/successmodal/successmodal.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FailuremodalComponent } from '../modal/failuremodal/failuremodal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  public signupForm !: FormGroup;

  constructor(private router:Router, private bmtService: BmtServices, private formBuilder: FormBuilder, public bsModalRef: BsModalRef, private modalService: BsModalService) {

    this.signupForm = this.formBuilder.group({
      firstname: [[], [Validators.required]],
      lastName: [[], [Validators.required]],
      emailid: [[], [Validators.required]],
      password: [[], [Validators.required]]

    });

  }

  // myAccount: UserLogin={
  //   firstName:"",
  //   lastName:"",
  //   emailAddress:"",
  //   password:""
  // }

  signupdetails: SignUpDetails = new SignUpDetails;

  status: any = "";


  onCreateAccount() {
    this.signupdetails.firstName = this.signupForm.value.firstname;
    this.signupdetails.lastName = this.signupForm.value.lastName;
    this.signupdetails.emailAddress = this.signupForm.value.emailid;
    this.signupdetails.password = this.signupForm.value.password;

    // this.myAccount.firstName=fname;
    // //console.log(this.myAccount.firstName);
    // this.myAccount.lastName=lname;
    // this.myAccount.emailAddress=email;
    // this.myAccount.password=pwd;
    //this.bmtService.createAccount(this.myAccount);
    this.bmtService.createAccount(this.signupdetails).subscribe(data => {
      this.status = data;
      if (this.status.status == 200 || this.status.status == 302) {
        const initialState: ModalOptions = {
          initialState: {
            title: this.status.message
            //formDataToEdit: formDataToEdit

          },
          class: 'modal-dialog-centered',
          backdrop: true,
          ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(SuccessmodalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cancel';
        this.clear();
      } else {
        const initialState: ModalOptions = {
          initialState: {
            title: 'Failed To Create Account'
            //formDataToEdit: formDataToEdit

          },
          class: 'modal-dialog-centered',
          backdrop: true,
          ignoreBackdropClick: true
        };
        this.bsModalRef = this.modalService.show(FailuremodalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cancel';
        this.clear();
      }
    });
  }


  backToLogin(){

    this.router.navigateByUrl('/main');
   
  }



  clear(){
    this.signupForm = this.formBuilder.group({
      firstname: [''],
      lastName: [''],
      emailid: [''],
      password: ['']
    });
  }

 
}
