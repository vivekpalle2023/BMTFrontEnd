import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('staticFormTabs', { static: false }) staticFormTabs?: TabsetComponent;

  isLoggedIn = false;
  userName: any;
  purchaseFormGroup: FormGroup;
  //EventsData: any;

  constructor(private router:Router, private authenticationService: AuthenticationService, private fb: FormBuilder){

    this.purchaseFormGroup = this.fb.group({
      formId: [[], [Validators.required]],
      fromDate: [''],
      toDate: [''],
      selectedFileType: [[], [Validators.required]]
    });

  }

  currentTab=0;
  isTabselected(event:MouseEvent, tabIndex: number)
  {
    this.currentTab=tabIndex;
  }

  logout(): void {

    this.authenticationService.logout();

}

ngOnInit(): void {


  const user = this.authenticationService.userValue;
  this.userName = user?.firstname;
  this.isLoggedIn = this.authenticationService.isUserLoggedIn();

}

getEventData = () => {
  
  // this.service.getEvents().subscribe(data => {
  //   this.eventData = data;
  //   console.log("Event Data : "+ this.eventData);
  // });
  
}

}
