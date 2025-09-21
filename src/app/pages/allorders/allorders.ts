import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrederService } from '../../core/service/oreder-service';
import { OrdersI } from '../../core/interface/orders-i';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-allorders',
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './allorders.html',
  styleUrl: './allorders.css'
})
export class Allorders implements OnInit {
  orders: OrdersI[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private orderService: OrederService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = '';
    
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load orders. Please try again.';
        this.loading = false;
        console.error('Error loading orders:', error);
      }
    });
  }
}
