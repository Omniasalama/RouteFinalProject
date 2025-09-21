import { RouterLink } from '@angular/router';
import { Cartinterface } from './../../core/interface/cartinterface';
import { CartService } from './../../core/service/cartService';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, SkeletonComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  isloadded: boolean = false;

  // initialize products as empty array so the template won’t break
  cartInter: Cartinterface = { products: [], totalCartPrice: 0 };

  private readonly cartserv = inject(CartService);
  private readonly toast = inject(ToastrService);

  cartId!: string;
  totalCartItems: number = 0;
  totalCartPrice: number = 0;

  ngOnInit(): void {
    this.loadcart();
  }

  loadcart() {
    this.cartserv.getCart().subscribe({
      next: (res) => {
        console.log('Cart API response:', res);

        this.cartInter = res.data; // contains products, totalCartPrice, etc.
        this.cartId = res.cartId;
        this.totalCartItems = res.numOfCartItems;
        this.totalCartPrice = res.data.totalCartPrice; // ✅ fixed
        this.isloadded = true;
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.isloadded = false;
      },
    });
  }

  removeProduct(productId: string) {
    this.cartserv.removeItemCart(productId).subscribe({
      next: (res) => {
        this.cartInter = res.data;
        this.totalCartItems = res.numOfCartItems;
        this.totalCartPrice = res.data.totalCartPrice; // ✅ fixed
      },
      error: (err) => {
        console.error('Error removing product:', err);
      },
    });
  }

  changeQuantity(productId: string, count: number) {
    this.cartserv.updateQuantity(productId, count).subscribe({
      next: (res) => {
        this.cartInter = res.data;
        this.totalCartItems = res.numOfCartItems;
        this.totalCartPrice = res.data.totalCartPrice; // ✅ fixed
        this.toast.success('Quantity updated', '', {
          progressBar: true,
          timeOut: 2000,
        });
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
      },
    });
  }
  clearCart() {
    this.cartserv.deleteCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.loadcart();
        }
      },
    });
  }
}
