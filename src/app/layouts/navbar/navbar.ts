import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/service/auth';
import { SearchService } from '../../core/service/search.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule , TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  @Input() isLogin: boolean = true;

  searchQuery: string = '';
  showSearchResults: boolean = false;
  searchResults: any = {
    products: [],
    categories: [],
    brands: []
  };
  searchLoading: boolean = false;

  private readonly auth = inject(Auth);
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
    console.log(this.auth.DecodeToken);
  }

  onSearchInput(event: any): void {
    const query = event.target.value.trim();
    this.searchQuery = query;
    
    if (query.length >= 2) {
      this.performSearch(query);
    } else {
      this.showSearchResults = false;
      this.searchResults = { products: [], categories: [], brands: [] };
    }
  }

  performSearch(query: string): void {
    this.searchLoading = true;
    this.showSearchResults = true;

    this.searchService.searchAll(query).subscribe({
      next: (response) => {
        this.searchResults = response.data;
        this.searchLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.toastr.error('Search failed. Please try again.', 'Error');
        this.searchLoading = false;
      }
    });
  }

  onSearchSubmit(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.showSearchResults = false;
      this.searchQuery = '';
    }
  }

  onProductClick(product: any): void {
    this.router.navigate(['/details', product._id]);
    this.showSearchResults = false;
    this.searchQuery = '';
  }

  onCategoryClick(category: any): void {
    this.router.navigate(['/categories'], { queryParams: { category: category._id } });
    this.showSearchResults = false;
    this.searchQuery = '';
  }

  onBrandClick(brand: any): void {
    this.router.navigate(['/brands'], { queryParams: { brand: brand._id } });
    this.showSearchResults = false;
    this.searchQuery = '';
  }

  hideSearchResults(): void {
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }
}
