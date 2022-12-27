import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _base = 'http://localhost:8050/api/v1/orders'

  constructor(private http : HttpClient ) {}

  getOrders() : Observable<any>{
    return this.http.get<Order[]>(this._base)
  }

}
