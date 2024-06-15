import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, map } from 'rxjs';
import { IFoodDetails } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public foodList: IFoodDetails[];
  public searchText: string;
  public addToCardModal: boolean;
  public foodItem: IFoodDetails
  constructor(
    private foodService: FoodService,
    private modalService: NgbModal
    
    ) {
    this.foodList = [] as IFoodDetails[];
    this.searchText = "";
    this.addToCardModal = false;
    this.foodItem = {} as IFoodDetails;
   }

  ngOnInit(): void {
    this.initializeFoodList()
   
  }

  public initializeFoodList(){
    this.foodService.getFoodList().pipe(map((item: IFoodDetails[])=>{
      return item.filter((item: IFoodDetails)=>{
        return (
          item.restaurant.toLowerCase().includes(this.searchText.toLowerCase()) ||  
          item.dishName.toLowerCase().includes(this.searchText.toLowerCase())
        )
      })
    })).subscribe((res: IFoodDetails[])=>{
      this.foodList = res; 
    })
  }

  public addToCart(content: any, item: IFoodDetails): void{
   this.modalService.open(content);
   this.foodItem = item;
  }
  public placeOrder(content: any, item: IFoodDetails): void{
   this.modalService.open(content);
   this.foodItem = item;
  }
}
