import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IConfirmOrderDetails } from '../models/confirmOrder.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmOrderService {
  private confirmOrderSubject: BehaviorSubject<IConfirmOrderDetails[]>;
  public confirmOrderList: Observable<IConfirmOrderDetails[]>;
  private total: number;
  constructor() {
    this.confirmOrderSubject = new BehaviorSubject<IConfirmOrderDetails[]>(JSON.parse(localStorage.getItem('confirmOrder')||"[]"));
    this.confirmOrderList = this.confirmOrderSubject.asObservable();
    this.total  = 0;
   }

   public get confirmOrderValue(): IConfirmOrderDetails[] {
    return this.confirmOrderSubject.value;
  }

  public set confirmOrderUpdate(list: IConfirmOrderDetails[]){
    this.confirmOrderSubject.next(list);
  }

  public clearConfirmOrderList(): void{
    localStorage.removeItem('confirmOrder')
    this.confirmOrderSubject.next([]);
  }

  public set setTotal(sum: number){
    this.total = sum;
  }

  public get getTotal(): number{
    return this.total;
  }
}
