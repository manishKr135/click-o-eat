import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { fakeBackendProvider } from './_helper/fake-backend';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HomeComponent } from './components/main-app/home/home.component';
import { AddToCartModalComponent } from './components/main-app/add-to-cart-modal/add-to-cart-modal.component';
import { PlaceOrderModalComponent } from './components/main-app/place-order-modal/place-order-modal.component';
import { ConfirmOrderComponent } from './components/main-app/confirm-order/confirm-order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceOrderComponent } from './components/main-app/place-order/place-order.component';
import { SettingsComponent } from './components/main-app/settings/settings.component';
import { UserProfileComponent } from './components/main-app/settings/user-profile/user-profile.component';
import { UserAddAddressComponent } from './components/main-app/settings/user-add-address/user-add-address.component';
import { UserAddPaymentDetailsComponent } from './components/main-app/settings/user-add-payment-details/user-add-payment-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ResetpasswordComponent,
    HomeComponent,
    AddToCartModalComponent,
    PlaceOrderModalComponent,
    ConfirmOrderComponent,
    NotFoundComponent,
    PlaceOrderComponent,
    SettingsComponent,
    UserProfileComponent,
    UserAddAddressComponent,
    UserAddPaymentDetailsComponent,
    FooterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
