import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFoodDetails } from '../models/food.model';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  public getFoodList():Observable<IFoodDetails[]>{
    return this.http.get<IFoodDetails[]>("http://localhost:3000/foodList");
  }

  public placeOrder(orderDetails: IOrder): Observable<IOrder>{
    return this.http.post<IOrder>('http://localhost:3000/orders', orderDetails);
  }

  public getOrdersList(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>('http://localhost:3000/orders');
  }

  public updateOrderList(id: any, orderDetails: IOrder ): Observable<IOrder>{
    return this.http.patch<IOrder>(`http://localhost:3000/orders/${id}`, orderDetails);
  }
}
