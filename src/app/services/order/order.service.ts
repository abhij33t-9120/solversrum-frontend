import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/api/api';
import { Order } from 'src/app/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(id): Observable<any> {
    if (id != 9910)
      return this.http.get(Api.orderApi + '/cus/' + id)
    return this.http.get<Order[]>(Api.orderApi)
  }

}
