import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { 
  ForgotPasswordRequest, 
  ForgotPasswordResponse,
  VerifyResetCodeRequest,
  VerifyResetCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse
} from '../interface/auth-interface';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient, private router: Router) {}
  register(form: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/signup', form);
  }
  login(form: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/signin', form);
  }
  DecodeToken(): any | null {
    try {
      const token = this.getToken();
      if (!token) return null;
      return jwtDecode(token); // returns payload (including userId if encoded)
    } catch {
      this.logout();
      return null;
    }
  }

  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
  getUserId(): string | null {
    const decoded: any = this.DecodeToken();
    return decoded ? decoded.id || decoded._id : null;
  }

  // Password Reset Methods
  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    const request: ForgotPasswordRequest = { email };
    return this.http.post<ForgotPasswordResponse>(environment.baseUrl + 'auth/forgotPasswords', request);
  }

  verifyResetCode(resetCode: string): Observable<VerifyResetCodeResponse> {
    const request: VerifyResetCodeRequest = { resetCode };
    return this.http.post<VerifyResetCodeResponse>(environment.baseUrl + 'auth/verifyResetCode', request);
  }

  resetPassword(email: string, newPassword: string): Observable<ResetPasswordResponse> {
    const request: ResetPasswordRequest = { email, newPassword };
    return this.http.put<ResetPasswordResponse>(environment.baseUrl + 'auth/resetPassword', request);
  }

  // User Profile Methods
  changePassword(currentPassword: string, newPassword: string): Observable<ChangePasswordResponse> {
    const request: ChangePasswordRequest = { currentPassword, newPassword };
    return this.http.put<ChangePasswordResponse>(environment.baseUrl + 'users/changeMyPassword', request, {
      headers: {
        token: this.getToken()!
      }
    });
  }

  updateProfile(userData: UpdateProfileRequest): Observable<UpdateProfileResponse> {
    return this.http.put<UpdateProfileResponse>(environment.baseUrl + 'users/updateMe/', userData, {
      headers: {
        token: this.getToken()!
      }
    });
  }
}
