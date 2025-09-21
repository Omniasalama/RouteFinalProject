import { Product } from '../../core/interface/products';
import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../../core/service/products';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/service/cartService';
import { ToastrService } from 'ngx-toastr';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-all-products',
  imports: [RouterLink, SkeletonComponent],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css',
})
export class AllProducts implements OnInit {
  AllProducts: Product[] = [];
  loading: boolean = true;
  constructor(private allProducts: Products) {}
  private readonly cartserv = inject(CartService);
    private readonly toast = inject(ToastrService);

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.loading = true;
    this.allProducts.getProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.AllProducts = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
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
