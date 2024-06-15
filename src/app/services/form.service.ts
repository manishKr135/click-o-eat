import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserFormData } from '../models/user.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }
  public sendUserDetails(formData:IUserFormData):Observable<IUserFormData>{
    return this.http.post<IUserFormData>(`${environment.JSON_BASE_PATH}/users`,formData)
  }
  public getUsersDetails():Observable<IUserFormData[]>{
    return this.http.get<IUserFormData[]>(`${environment.JSON_BASE_PATH}/users`)
  }
  public getUsersDetailsByEmail(email: string):Observable<IUserFormData>{
    let params = new HttpParams();
    params = params.append('email', email)
    return this.http.get<IUserFormData>(`${environment.JSON_BASE_PATH}/users`, {params} )
  }
  public getUsersDetailsByEmailSync(email: string):Observable<IUserFormData>{
    let params = new HttpParams();
    params = params.append('email', email)
    return this.http.get<IUserFormData>(`${environment.JSON_BASE_PATH}/users`, {params} )
  }
  public updateUser(id: number, data: any):Observable<IUserFormData>{
   
    return this.http.patch<IUserFormData>(`${environment.JSON_BASE_PATH}/users/${id}`, data )
  }
}
