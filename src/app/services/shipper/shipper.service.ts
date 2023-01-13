import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Api } from 'src/app/api/api';
import { Shipper } from '../../models/Shipper';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {
  private _ShipperListModified = new Subject<void>();
  constructor(private http: HttpClient) { }

  getShipperSubject() {
    return this._ShipperListModified;
  }

  getShippers(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(Api.shipperApi);
  }

  deleteShipper(id) {
    return this.http.delete(Api.shipperApi + '/' + id, { responseType: 'text' }).pipe(
      tap(() => this._ShipperListModified.next())
    )
  }

  addShipper(shipper) : any {
    return this.http.post(Api.shipperApi, {'list' : [shipper]}, { responseType: 'text' }).pipe(
      tap(() => this._ShipperListModified.next())
    )
  }
}
