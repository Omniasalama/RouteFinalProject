import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-examples',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto p-6 space-y-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Auth Service Examples</h1>
      
      <!-- Forgot Password Example -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Forgot Password</h2>
        <form (ngSubmit)="onForgotPassword()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
              type="email" 
              [(ngModel)]="forgotPasswordEmail" 
              name="forgotPasswordEmail"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
          </div>
          <button 
            type="submit" 
            [disabled]="forgotPasswordLoading"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {{ forgotPasswordLoading ? 'Sending...' : 'Send Reset Code' }}
          </button>
        </form>
      </div>

      <!-- Verify Reset Code Example -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Verify Reset Code</h2>
        <form (ngSubmit)="onVerifyResetCode()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Reset Code</label>
            <input 
              type="text" 
              [(ngModel)]="resetCode" 
              name="resetCode"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
          </div>
          <button 
            type="submit" 
            [disabled]="verifyCodeLoading"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {{ verifyCodeLoading ? 'Verifying...' : 'Verify Code' }}
          </button>
        </form>
      </div>

      <!-- Reset Password Example -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Reset Password</h2>
        <form (ngSubmit)="onResetPassword()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
              type="email" 
              [(ngModel)]="resetPasswordEmail" 
              name="resetPasswordEmail"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input 
              type="password" 
              [(ngModel)]="newPassword" 
              name="newPassword"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
          </div>
          <button 
            type="submit" 
            [disabled]="resetPasswordLoading"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {{ resetPasswordLoading ? 'Resetting...' : 'Reset Password' }}
          </button>
        </form>
      </div>

      <!-- Change Password Example (requires login) -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Change Password (Logged In Users)</h2>
        <form (ngSubmit)="onChangePassword()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
            <input 
              type="password" 
              [(ngModel)]="currentPassword" 
              name="currentPassword"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input 
              type="password" 
              [(ngModel)]="changeNewPassword" 
              name="changeNewPassword"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
          </div>
          <button 
            type="submit" 
            [disabled]="changePasswordLoading"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {{ changePasswordLoading ? 'Changing...' : 'Change Password' }}
          </button>
        </form>
      </div>

      <!-- Update Profile Example (requires login) -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Update Profile (Logged In Users)</h2>
        <form (ngSubmit)="onUpdateProfile()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input 
                type="text" 
                [(ngModel)]="profileData.name" 
                name="name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input 
                type="tel" 
                [(ngModel)]="profileData.phone" 
                name="phone"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
              <input 
                type="number" 
                [(ngModel)]="profileData.age" 
                name="age"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
              <select 
                [(ngModel)]="profileData.gender" 
                name="gender"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
              <input 
                type="text" 
                [(ngModel)]="profileData.city" 
                name="city"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
            </div>
          </div>
          <button 
            type="submit" 
            [disabled]="updateProfileLoading"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {{ updateProfileLoading ? 'Updating...' : 'Update Profile' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class AuthExamplesComponent {
  // Form data
  forgotPasswordEmail: string = '';
  resetCode: string = '';
  resetPasswordEmail: string = '';
  newPassword: string = '';
  currentPassword: string = '';
  changeNewPassword: string = '';
  profileData = {
    name: '',
    phone: '',
    age: null as number | null,
    gender: '' as 'male' | 'female' | '',
    city: ''
  };

  // Loading states
  forgotPasswordLoading: boolean = false;
  verifyCodeLoading: boolean = false;
  resetPasswordLoading: boolean = false;
  changePasswordLoading: boolean = false;
  updateProfileLoading: boolean = false;

  constructor(
    private authService: Auth,
    private toastr: ToastrService
  ) {}

  onForgotPassword() {
    if (!this.forgotPasswordEmail) return;
    
    this.forgotPasswordLoading = true;
    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.forgotPasswordLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to send reset code', 'Error');
        this.forgotPasswordLoading = false;
      }
    });
  }

  onVerifyResetCode() {
    if (!this.resetCode) return;
    
    this.verifyCodeLoading = true;
    this.authService.verifyResetCode(this.resetCode).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.verifyCodeLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Invalid reset code', 'Error');
        this.verifyCodeLoading = false;
      }
    });
  }

  onResetPassword() {
    if (!this.resetPasswordEmail || !this.newPassword) return;
    
    this.resetPasswordLoading = true;
    this.authService.resetPassword(this.resetPasswordEmail, this.newPassword).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.resetPasswordLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to reset password', 'Error');
        this.resetPasswordLoading = false;
      }
    });
  }

  onChangePassword() {
    if (!this.currentPassword || !this.changeNewPassword) return;
    
    this.changePasswordLoading = true;
    this.authService.changePassword(this.currentPassword, this.changeNewPassword).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.changePasswordLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to change password', 'Error');
        this.changePasswordLoading = false;
      }
    });
  }

  onUpdateProfile() {
    // Filter out empty values
    const updateData = Object.fromEntries(
      Object.entries(this.profileData).filter(([_, value]) => value !== '' && value !== null)
    );
    
    if (Object.keys(updateData).length === 0) {
      this.toastr.warning('Please fill at least one field', 'Warning');
      return;
    }
    
    this.updateProfileLoading = true;
    this.authService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.updateProfileLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to update profile', 'Error');
        this.updateProfileLoading = false;
      }
    });
  }
}
