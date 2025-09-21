import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../../core/service/products';
import { Category, Product } from '../../core/interface/products';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/service/categories-service';
import { CartService } from '../../core/service/cartService';
import { ToastrService } from 'ngx-toastr';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, SkeletonComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  productList: Product[] = [];
  categoriesList: Category[] = [];
  productsLoading: boolean = true;
  categoriesLoading: boolean = true;
  private readonly cartserv = inject(CartService);
  private readonly toast = inject(ToastrService);

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 500,
    navText: [
      '<i class="fa-solid fa-arrow-left-long"></i>',
      '<i class="fa-solid fa-arrow-right-long"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  constructor(
    private products: Products,
    private Categories: CategoriesService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.productsLoading = true;
    this.products.getProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res.data;
        this.productsLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.productsLoading = false;
      },
    });
  }
  getCategories() {
    this.categoriesLoading = true;
    this.Categories.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList = res.data;
        this.categoriesLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.categoriesLoading = false;
      },
    });
  }
  addToCart(productId: string): void {
    console.log(productId);
    this.cartserv.addToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.toast.success(res.message, '', {
            progressBar: true,
            timeOut: 2000,
          });
        }
      },
    });
  }
}
