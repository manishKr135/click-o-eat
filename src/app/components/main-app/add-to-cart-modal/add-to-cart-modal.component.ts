import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IConfirmOrderDetails } from 'src/app/models/confirmOrder.model';
import { IFoodDetails } from 'src/app/models/food.model';
import { ConfirmOrderService } from 'src/app/services/confirm-order.service';

@Component({
  selector: 'add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.css']
})
export class AddToCartModalComponent implements OnInit {
  @Input('selectedFoodItem') selectedFoodItem: IFoodDetails;
  public confirmOrderList: IConfirmOrderDetails[];
  public updatedList: IConfirmOrderDetails[];
  
  constructor(
    private confirmOrderService: ConfirmOrderService,
    private router: Router,
    private modalService: NgbModal
  ) { 
    this.confirmOrderList = {} as IConfirmOrderDetails[];
    this.updatedList = {} as IConfirmOrderDetails[];
    this.selectedFoodItem = {} as IFoodDetails;
 
  }

  ngOnInit(): void { 
    this.confirmOrderService.confirmOrderList.subscribe((list: IConfirmOrderDetails[]) => this.confirmOrderList = list);  
  }

  public addItem(foodItem: IFoodDetails):void{
    
    if(this.confirmOrderList){
      let f = this.confirmOrderList.find((item: IConfirmOrderDetails)=>{
         if(foodItem.id === item.foodId){  
           return true;
         }
         else{
           return false;
         }
      });
      if(f){
        let quantity = f.quantity +=1;
        let price = quantity * f.basePrice;
        f.quantity = quantity;
        f.itemPrice = price;    
      }
      else{
        this.confirmOrderList.push({
          basePrice: foodItem.cost,
          imageUrl: foodItem.imageUrl,
          quantity: 1,
          itemPrice: foodItem.cost,
          foodId: foodItem.id,
          foodName: foodItem.dishName,
          desc: foodItem.description
        })
      }
      localStorage.setItem('confirmOrder', JSON.stringify(this.confirmOrderList));
      this.confirmOrderService.confirmOrderUpdate = this.confirmOrderList;
      
    }
    else{
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

    }
    this.modalService.dismissAll()
    this.router.navigate(['/confirmorder']);
  }
}
