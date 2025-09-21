import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService, SearchResponse } from '../../core/service/search.service';
import { ToastrService } from 'ngx-toastr';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchResults: any = null;
  loading: boolean = false;
  totalResults: number = 0;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.performSearch();
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  performSearch(): void {
    if (!this.searchQuery.trim()) {
      this.toastr.warning('Please enter a search term', 'Warning');
      return;
    }

    this.loading = true;
    this.searchService.searchAll(this.searchQuery).subscribe({
      next: (response: SearchResponse) => {
        this.searchResults = response.data;
        this.totalResults = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.toastr.error('Search failed. Please try again.', 'Error');
        this.loading = false;
      }
    });
  }

  viewProduct(product: any): void {
    this.router.navigate(['/details', product._id]);
  }

  viewCategory(category: any): void {
    this.router.navigate(['/categories'], { queryParams: { category: category._id } });
  }

  viewBrand(brand: any): void {
    this.router.navigate(['/brands'], { queryParams: { brand: brand._id } });
  }
}
