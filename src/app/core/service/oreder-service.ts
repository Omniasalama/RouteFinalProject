import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OrdersI } from '../interface/orders-i';

@Injectable({
  providedIn: 'root',
})
export class OrederService {
  constructor(private http: HttpClient, private authser: Auth) {}

  createOrder(
    cartId: string,
    userId:string,
    shippingAddress: { details: string; phone: string; city: string }
  ): Observable<any> {
    const returnurl = '?url=http://localhost:4200';

    return this.http.post(
      environment.baseUrl + 'orders/checkout-session/' + cartId + returnurl,
      {
        shippingAddress,
      },
      {
        headers: {
          token: this.authser.getToken()!,
        },
      }
    );
  }

  getAllOrders(): Observable<{data: OrdersI[]}> {
    return this.http.get<{data: OrdersI[]}>(
      'https://ecommerce.routemisr.com/api/v1/orders/',
      {
        headers: {
          token: this.authser.getToken()!,
        },
      }
    );
  }
}
