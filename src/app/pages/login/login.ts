import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  errmess: string = '';
  showPassword: boolean = false; // 👁️ toggle state

  constructor(private auth: Auth, private router: Router) {}

  loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // 👁️ toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    this.auth.login(this.loginform.value).subscribe({
      next: (res) => {
        console.log(res); 
        if (res.message === 'success') {
          this.auth.saveToken(res.token);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(err);
        this.errmess = err.error.message;
      },
    });
  }
}
