import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/service/auth';
import { ToastrService } from 'ngx-toastr';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-forgetpassword',
  imports: [CommonModule, FormsModule, RouterLink, SkeletonComponent],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.css'
})
export class Forgetpassword implements OnInit {
  currentStep: number = 1;
  loading: boolean = false;
  
  // Step 1: Forgot Password
  email: string = '';
  
  // Step 2: Verify Reset Code
  resetCode: string = '';
  
  // Step 3: Reset Password
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: Auth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Reset component state when initialized
    this.resetForm();
  }

  resetForm(): void {
    this.currentStep = 1;
    this.email = '';
    this.resetCode = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.loading = false;
  }

  // Step 1: Send forgot password email
  onForgotPassword(): void {
    if (!this.email) {
      this.toastr.warning('Please enter your email address', 'Warning');
      return;
    }

    this.loading = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.currentStep = 2;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to send reset code', 'Error');
        this.loading = false;
      }
    });
  }

  // Step 2: Verify reset code
  onVerifyResetCode(): void {
    if (!this.resetCode) {
      this.toastr.warning('Please enter the reset code', 'Warning');
      return;
    }

    this.loading = true;
    this.authService.verifyResetCode(this.resetCode).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.currentStep = 3;
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Invalid reset code', 'Error');
        this.loading = false;
      }
    });
  }

  // Step 3: Reset password
  onResetPassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      this.toastr.warning('Please fill in all password fields', 'Warning');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    if (this.newPassword.length < 6) {
      this.toastr.error('Password must be at least 6 characters long', 'Error');
      return;
    }

    this.loading = true;
    this.authService.resetPassword(this.email, this.newPassword).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.loading = false;
        // Navigate to login page after successful password reset
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to reset password', 'Error');
        this.loading = false;
      }
    });
  }

  // Go back to previous step
  goBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Reset the entire flow
  startOver(): void {
    this.resetForm();
  }
}
