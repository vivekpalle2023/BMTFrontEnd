import { Component } from '@angular/core';
import { myorder } from '../model/myorder';
import { BmtServices } from '../services/bmt.service';
import { EventManager } from '@angular/platform-browser';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent {

  emailId: any;

  constructor(private service: BmtServices, private authenticationService: AuthenticationService) {

  }

  myOrders: any = myorder;

  ngOnInit(): void {
    const user = this.authenticationService.userValue;
    this.emailId = user?.emailId;
    this.service.getOrders(this.emailId).subscribe(data => {
      this.myOrders = data;
    })

  }
}
