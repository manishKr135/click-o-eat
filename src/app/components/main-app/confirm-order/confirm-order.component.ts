import { Component, OnInit } from '@angular/core';
import { IConfirmOrderDetails } from 'src/app/models/confirmOrder.model';
import { User } from 'src/app/models/curUser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmOrderService } from 'src/app/services/confirm-order.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  public confirmOrderList: IConfirmOrderDetails[];
  public itemTotal: number;
  public tax: number;
  public shippingCharge: number;
  public disabled: boolean;
  public currentUser: User;
  public isAddressPresent: boolean
  constructor(
    private confirmOrderService: ConfirmOrderService,
    private authenticationService: AuthenticationService
    
  ) {
    this.confirmOrderList = {} as IConfirmOrderDetails[];
    this.itemTotal = 0;
    this.tax = 0;
    this.shippingCharge = 0;
    this.disabled = true;
    this.currentUser = {} as User;
    this.isAddressPresent = true;
   }

  ngOnInit(): void {
    this.confirmOrderService.confirmOrderList.subscribe((list: IConfirmOrderDetails[]) => this.confirmOrderList = list);
    this.calculateTotalPriceAndTax();
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user
      if(user.address.length!==0){
        this.isAddressPresent = false;  
      }
    });
    
  }

  ngDoCheck(): void{
    if(this.confirmOrderList.length === 0){
      this.disabled = true;
      this.shippingCharge = 0;
    }
    else{
      this.disabled = false;
      this.shippingCharge = 40;
    }
  }
  public calculateTotalPriceAndTax(): void{
   
    let total = 0;
    this.confirmOrderList.forEach((item: IConfirmOrderDetails)=>{
      total += item.itemPrice;
    })
    this.itemTotal = total;
    this.tax = Math.floor((total * 10) / 100)
    this.confirmOrderService.setTotal = this.itemTotal + this.tax + (this.confirmOrderList.length === 0? 0: 40)
  }
  public removeItem(listItem: IConfirmOrderDetails): void{ 
    this.confirmOrderList = this.confirmOrderList.filter((item: IConfirmOrderDetails)=>{
      if(item.foodId === listItem.foodId){
        return false;
      }
      else{
        return true;
      }
    });
    
    this.calculateTotalPriceAndTax();
    localStorage.setItem('confirmOrder', JSON.stringify(this.confirmOrderList));
    this.confirmOrderService.confirmOrderUpdate = this.confirmOrderList;
  }
}
