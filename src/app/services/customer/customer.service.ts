import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Api } from 'src/app/api/api';
import { Customer } from 'src/app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _customerListModified = new Subject<void>()
  constructor(private http: HttpClient) { }

  get CustomerSubject() {
    return this._customerListModified
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(Api.customerApi)
  }

  getCustomerbyId(id): Observable<Customer> {
    return this.http.get<Customer>(Api.customerApi + '/' + id)
  }

  deleleCustomer(id) {
    return this.http.delete(Api.customerApi + '/' + id, { responseType: 'text' }).pipe(
      tap(() => {
        this._customerListModified.next();
      })
    );
  }

  addCustomer(customer) {
    return this.http.post(Api.customerApi, { 'list': [customer] }, { responseType: 'text' }).pipe(
      tap(() => {
        this._customerListModified.next();
      })
    );
  }

  editCustomer(customer) {
    return this.http.put(Api.customerApi + '/' + customer.customerId, customer, { responseType: 'text' }).pipe(
      tap(() => {
        this._customerListModified.next();
      })
    );
  }

}
