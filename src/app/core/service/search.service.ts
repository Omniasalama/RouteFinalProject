import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SearchResult {
  products: any[];
  categories: any[];
  brands: any[];
  totalResults: number;
}

export interface SearchResponse {
  status: string;
  results: number;
  data: {
    products: any[];
    categories: any[];
    brands: any[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  // Search across all entities (products, categories, brands)
  searchAll(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${environment.baseUrl}products/search?q=${encodeURIComponent(query)}`);
  }

  // Search only products
  searchProducts(query: string, page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${environment.baseUrl}products?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  }

  // Search only categories
  searchCategories(query: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}categories?search=${encodeURIComponent(query)}`);
  }

  // Search only brands
  searchBrands(query: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}brands?search=${encodeURIComponent(query)}`);
  }

  // Get search suggestions (for autocomplete)
  getSearchSuggestions(query: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}products/suggestions?q=${encodeURIComponent(query)}`);
  }
}
