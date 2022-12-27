import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Shipper } from '../../models/Shipper';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {
  private _base = 'http://localhost:8050/api/v1/shippers'
  private _ShipperListModified = new Subject<void>();
  constructor(private http: HttpClient) { }

  getShipperSubject() {
    return this._ShipperListModified;
  }

  getShippers(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(this._base);
  }

  deleteShipper(id) {
    return this.http.delete(this._base + '/' + id, { responseType: 'text' }).pipe(
      tap(() => this._ShipperListModified.next())
    )
  }

  addShipper(shipper) : any {
    return this.http.post(this._base, {'list' : [shipper]}, { responseType: 'text' }).pipe(
      tap(() => this._ShipperListModified.next())
    )
  }
}
