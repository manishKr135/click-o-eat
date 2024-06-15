import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConfirmOrderComponent } from './components/main-app/confirm-order/confirm-order.component';
import { HomeComponent } from './components/main-app/home/home.component';
import { PlaceOrderComponent } from './components/main-app/place-order/place-order.component';
import { SettingsComponent } from './components/main-app/settings/settings.component';
import { UserAddAddressComponent } from './components/main-app/settings/user-add-address/user-add-address.component';
import { UserAddPaymentDetailsComponent } from './components/main-app/settings/user-add-payment-details/user-add-payment-details.component';
import { UserProfileComponent } from './components/main-app/settings/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthGuard } from './_helper/auth.guard';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  {path: 'login', component: LoginComponent},
  {path: 'passwordreset', component: ResetpasswordComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'confirmorder', component: ConfirmOrderComponent, canActivate:[AuthGuard]},
  {path: 'placeorder', component: PlaceOrderComponent, canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent,
  children:[
    { path: 'userprofile', component: UserProfileComponent, canActivate:[AuthGuard]},
    { path: 'useraddaddress', component: UserAddAddressComponent, canActivate:[AuthGuard]},
    { path: 'useraddpaymentdetails', component: UserAddPaymentDetailsComponent, canActivate:[AuthGuard]},
  ],
  canActivate:[AuthGuard]},

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
