import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BmtServices } from '../services/bmt.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  
  username: string = "";
  password: string = "";
  successMessage: string = "";
  invalidLogin = false;
  loginSuccess = false;
  error: string = "";
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  loading = false;
  loginData : any;

  constructor(private router:Router, private service:BmtServices, private http:HttpClient, private formBuilder: FormBuilder, private authenticationService: AuthenticationService ){

  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  title = 'Ticketing-Site';

  public loginForm !: FormGroup;

  images: any = [
    { img: "assets/Untitled.png" },
    { img: "assets/Untitled1.png" },
    { img: "assets/Untitled2.png" },
    { img: "assets/Untitled3.png" },
    { img: "assets/Untitled4.png" },
    { img: "assets/Untitled5.png" }

  ]

  Email_Address_Value: any = "Email address";

  inpclick(event: MouseEvent) {
    this.Email_Address_Value = "";
  }

  Password_Value: any = "Password";
  pwd_class: any = "inp";


  pwdclick(event: MouseEvent) {
    this.Password_Value = "";
    this.pwd_class = "inp1";

  }

  ticketData:any;
  ticketNo:String="Default Value";

  goToPage() {
 
    this.router.navigateByUrl('/register');
    // this.service.getTickets().subscribe(data=>{
    //   this.ticketData=data;
    //   this.ticketNo=this.ticketData.ticketNo;
    //   });
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.authenticationService.loginService(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          this.isLoginFailed = false;
          this.isLoggedIn = true; 
          this.loginData = data;
          console.log("Logged in user is : "+this.loginData.emailId);
          this.router.navigate(['/login']);
        },
        error: (error: string) => {
          if(error === "unauthorized"){
            this.error = "Unauthorized User";
          } else {
            this.error = "Invalid Credentials";
          }
          this.loading = false;
          this.isLoginFailed = true;
        }
      });
  }

}
