// Password Reset Interfaces
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface VerifyResetCodeRequest {
  resetCode: string;
}

export interface VerifyResetCodeResponse {
  status: string;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
}

// User Profile Interfaces
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  status: string;
  message: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: 'male' | 'female';
  city?: string;
}

export interface UpdateProfileResponse {
  status: string;
  message: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      age?: number;
      gender?: string;
      city?: string;
      role: string;
      active: boolean;
      wishlist: any[];
      addresses: any[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}
