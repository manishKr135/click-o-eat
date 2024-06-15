import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/curUser';
import { IFoodDetails } from 'src/app/models/food.model';
import { IOrder } from 'src/app/models/order.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmOrderService } from 'src/app/services/confirm-order.service';


@Component({
  selector: 'place-order-modal',
  templateUrl: './place-order-modal.component.html',
  styleUrls: ['./place-order-modal.component.css']
})
export class PlaceOrderModalComponent implements OnInit {
  @Input('selectedFoodItem') selectedFoodItem: IFoodDetails;
  public confirmOrderList: any;
  public currentUser: User;
  public disabled: boolean;
  public tax: number;
  constructor(
    private authenticationService: AuthenticationService,
    private confirmOrderService: ConfirmOrderService,
    private router: Router,
    private modalService: NgbModal
  ) { 
    this.selectedFoodItem = {} as IFoodDetails;
    this.confirmOrderList = [];
    this.currentUser = {} as User;
    this.disabled = true;
    this.tax = 0;
  }


  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    this.isAddressPresent();
  }
  public isAddressPresent(): void{
    if(this.currentUser.address[0]){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
  }

  public placeOrder(foodItem: IFoodDetails): void{
    this.confirmOrderList = []
    this.confirmOrderList.push({
        basePrice: foodItem.cost,
        imageUrl: foodItem.imageUrl,
        quantity: 1,
        itemPrice: foodItem.cost,
        foodId: foodItem.id,
        foodName: foodItem.dishName,
        desc: foodItem.description
    });
    localStorage.setItem('confirmOrder', JSON.stringify(this.confirmOrderList));
    this.confirmOrderService.confirmOrderUpdate = this.confirmOrderList;
    this.tax = Math.floor((foodItem.cost * 10) / 100)
    this.confirmOrderService.setTotal = foodItem.cost + this.tax
    this.modalService.dismissAll()
    this.router.navigate(['/placeorder']);
  }

}
