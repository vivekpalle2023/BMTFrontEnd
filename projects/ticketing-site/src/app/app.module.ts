import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TpHeaderComponent } from './tp-header/tp-header.component';
import { TpFooterComponent } from './tp-footer/tp-footer.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MainComponent } from './main/main.component';
import { PaymentComponent } from './payment/payment.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EventCardComponent } from './event-card/event-card.component';
import { SellticketsComponent } from './selltickets/selltickets.component';
import { MyordersComponent } from './myorders/myorders.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormatTimePipe, PurchasemodalComponent } from './modal/purchasemodal/purchasemodal.component';
import { SuccessmodalComponent } from './modal/successmodal/successmodal.component';
import { FailuremodalComponent } from './modal/failuremodal/failuremodal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { CactivateGuard } from './cactivate.guard';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [
    AppComponent,
    FormatTimePipe,
    TpHeaderComponent,
    TpFooterComponent,
    CreateAccountComponent,
    HomeComponent,
    ForgotpasswordComponent,
    MainComponent,
    PaymentComponent,
    EventCardComponent,
    SellticketsComponent,
    MyordersComponent,
    LoginComponent,
    PurchasemodalComponent,
    SuccessmodalComponent,
    FailuremodalComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CountdownModule,
    BrowserModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'login',
        component: HomeComponent
      },
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'register',
        component: CreateAccountComponent
      },
      {
        path: 'forgotpassword',
        component: ForgotpasswordComponent
      },
      {
        path: '', component: MainComponent, canActivate: [CactivateGuard],
        children: [
          // { path: '', component: MainComponent },
          { path: 'main', component: MainComponent },
          { path: 'register', component: CreateAccountComponent },
          { path: 'forgotpassword', component: ForgotpasswordComponent },
          { path: 'login', component: HomeComponent }
        ]
      }
    ]),
    HttpClientModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {


}
