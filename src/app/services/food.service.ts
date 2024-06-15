import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFoodDetails } from '../models/food.model';
import { IOrder } from '../models/order.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  public getFoodList():Observable<IFoodDetails[]>{
    return this.http.get<IFoodDetails[]>(`${environment.JSON_BASE_PATH}/foodList`);
  }

  public placeOrder(orderDetails: IOrder): Observable<IOrder>{
    return this.http.post<IOrder>(`${environment.JSON_BASE_PATH}/orders`, orderDetails);
  }

  public getOrdersList(): Observable<IOrder[]>{
    return this.http.get<IOrder[]>(`${environment.JSON_BASE_PATH}/orders`);
  }

  public updateOrderList(id: any, orderDetails: IOrder ): Observable<IOrder>{
    return this.http.patch<IOrder>(`${environment.JSON_BASE_PATH}/orders/${id}`, orderDetails);
  }
}
