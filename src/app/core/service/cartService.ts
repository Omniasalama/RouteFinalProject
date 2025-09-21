import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Auth } from './auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private Auth: Auth) {}

  addToCart(productId: string):Observable<any> {
    return this.http.post(
      environment.baseUrl + 'cart',
      {
        productId,
      },
      {
        headers: {
          token: this.Auth.getToken()!,
        },
      }
    );
  }
  updateQuantity(productId: string, count: number):Observable<any>  {
    return this.http.put(
      environment.baseUrl + `cart/${productId}`,
      {
        count,
      },
      {
        headers: {
          token: this.Auth.getToken()!,
        },
      }
    );
  }

  deleteCart():Observable<any>  {
    return this.http.delete(
      environment.baseUrl + 'cart',

      {
        headers: {
          token: this.Auth.getToken()!,
        },
      }
    );
  }
  removeItemCart(productId: string):Observable<any>  {
    return this.http.delete(environment.baseUrl + `cart/${productId}`, {
      headers: {
        token: this.Auth.getToken()!,
      },
    });
  }

  getCart():Observable<any>  {
    return this.http.get(environment.baseUrl + 'cart', {
      headers: {
        token: this.Auth.getToken()!,
      },
    });
  }
}
