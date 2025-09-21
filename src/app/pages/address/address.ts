import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { OrederService } from '../../core/service/oreder-service';
import { Auth } from '../../core/service/auth';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, FormsModule , RouterLink],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class Address implements OnInit {
  errmess: string = '';
  cartId: string = '';
  addressForm!: FormGroup; // ✅ Strong typing

  private readonly fb = inject(FormBuilder);
  private readonly order = inject(OrederService);
  private readonly router = inject(Router);
  private readonly activated = inject(ActivatedRoute);
  private readonly auth = inject(Auth);

  constructor() {
    this.cartId = this.activated.snapshot.paramMap.get('cartId')!;
    console.log(this.cartId);
  }

  ngOnInit(): void {
    this.activated.paramMap.subscribe((res) => {
      this.cartId = res.get('cartId')!; // ✅ correct key
      console.log('CartId from route:', this.cartId);
    });

    // ✅ Initialize the form here
    this.initForm();
  }

  private initForm(): void {
    this.addressForm = this.fb.group({
      details: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched(); // ✅ Force validation messages
      return;
    }
    this.order
      .createOrder(
        this.cartId,
        this.auth.getUserId()!, // 👈 now available
        this.addressForm.value
      )
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            open(res.session.url, '_self');
          }
        },
        error: (err) => {
          this.errmess = err.error?.message || 'Something went wrong';
        },
      });
  }
}
