import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class Products {
  productsList: [] = [];
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get(environment.baseUrl + `products`);
  }
  getSpecificProduct(id: string | null): Observable<any> {
    return this.http.get(environment.baseUrl + `products/${id}`);
  }
  getBrands(): Observable<any> {
    return this.http.get(environment.baseUrl + `brands`);
  }
}
