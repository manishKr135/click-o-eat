import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { IConfirmOrderDetails } from 'src/app/models/confirmOrder.model';
import { User } from 'src/app/models/curUser';
import { IOrder } from 'src/app/models/order.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmOrderService } from 'src/app/services/confirm-order.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  @ViewChild('paymentModal') paymentModal: TemplateRef<any>;
  public bankForm: FormGroup;
  public cardForm: FormGroup;
  public payOpt: string;
  public orderDetails: IOrder;
  public itemTotal: number;
  public disabled: boolean;
  public currentUser: User;
  public searchText: string;
  public orderHistory: IOrder;
  public showOrderStatus: boolean;
  public showOrderHistory: boolean;
  public selectCard: boolean;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private confirmOrderService: ConfirmOrderService,
    private authenticationService: AuthenticationService,
    private foodService: FoodService
  ) {
    this.paymentModal = {} as TemplateRef<any>;
    this.bankForm = {} as FormGroup;
    this.cardForm = {} as FormGroup;
    this.payOpt = "bank";
    this.orderDetails = {} as IOrder;
    this.itemTotal = 0;
    this.disabled = true;
    this.currentUser = {} as User;
    this.searchText = '';
    this.orderHistory = {} as IOrder;
    this.showOrderStatus = false;
    this.showOrderHistory = false;
    this.selectCard = false;
   }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user 
    });
    this.initializeForms();
    this.itemTotal = this.confirmOrderService.getTotal;
  }
  
  public initializeForms():void{
      this.bankForm =  this.formBuilder.group({
        bankName:["",[Validators.required]],
        accHolderName:["",[Validators.required]],
        accNo:["",[Validators.required]], 
        
      })

      this.cardForm =  this.formBuilder.group({
        
        cardNo:["",[Validators.required, Validators.minLength(16)]],
       
        year:["",[Validators.required] ],
        cvv:["",[Validators.required, Validators.minLength(3), Validators.minLength(3)] ],
      })
    }

    get bankFormControls(){
      return this.bankForm.controls;
    }
    get cardFormControls(){
      return this.cardForm.controls;
    }
  ngAfterViewInit(): void{  
    if(this.itemTotal!==0){
      this.showPaymentOptions();
    } 
  }
  
  ngDoCheck(): void{
    
    if(this.cardForm.status ==="VALID" || this.bankForm.status == "VALID" || this.selectCard || this.payOpt==='qr'){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
    
    
  }
 
  public clickCard(): void{
    this.selectCard = !this.selectCard;
  }
  public resetForm(): void{
    this.bankFormControls['bankName'].setValue('');
    this.bankFormControls['accHolderName'].setValue('');
    this.bankFormControls['accNo'].setValue('');

    this.cardFormControls['cardNo'].setValue('');
    
    this.cardFormControls['year'].setValue('');
    this.cardFormControls['cvv'].setValue('');

  }
  public placeOrder(): void{
    let d = new Date();

    this.foodService.getOrdersList().subscribe((res: IOrder[])=>{
      let order = res.find(x=> x.userid === this.currentUser.id);    
      if(order){
        this.orderDetails = {
          userid: this.currentUser.id,
          feedId: order.feedId + 1,
          orderstatus: "placed",
          paymentStatus: "paid",
          orderDateTime: `${d.toLocaleDateString()}:${d.toLocaleTimeString()}`
        }
        this.foodService.updateOrderList(order.id,this.orderDetails).subscribe((res: IOrder)=>{
          return res;;
        })
      }
      else{
        this. orderDetails = {
          userid: this.currentUser.id,
          feedId: 1,
          orderstatus: "placed",
          paymentStatus: "paid",
          orderDateTime: `${d.toLocaleDateString()}:${d.toLocaleTimeString()}`
        }
        this.foodService.placeOrder(this.orderDetails).subscribe((res: IOrder)=>{
          return res;       
        })
      }
      this.confirmOrderService.clearConfirmOrderList();
      this.showOrderStatus = true;
      this.modalService.dismissAll();
    })   
  }

  public getOrderHistory(): void{
    this.foodService.getOrdersList().pipe(map((item: IOrder[])=>{
      return item.filter((item: IOrder)=>{
        return (
          item.id == this.searchText
        )
      })
    })).subscribe((res: IOrder[])=>{
      this.orderHistory = res[0];
      this.showOrderHistory = true
    })
   
    
  }
  public changeOption(opt: string): void{
    this.payOpt = opt;
    this.selectCard=false;
    this.resetForm();
  }

  public showPaymentOptions(): void{
    this.modalService.open(this.paymentModal);
  }
}
