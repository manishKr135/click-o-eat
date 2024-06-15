import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './models/curUser';
import { AuthenticationService } from './services/authentication.service';
import { ConfirmOrderService } from './services/confirm-order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  currentUser: User | null;
  title = "Click'O'Eat";

  constructor(
    private router: Router,
    private confirmOrderService: ConfirmOrderService,
    private authenticationService: AuthenticationService
  ){
    this.currentUser = null;
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }
  
  logout() {
    this.confirmOrderService.clearConfirmOrderList();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
