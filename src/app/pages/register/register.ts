import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '../../core/service/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  errmess: string = '';
  constructor(private auth: Auth, private router: Router) {}
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl('',Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125]{1}[0-9]{8}$/),
      ]),
    },
    this.confirmpassword
  );

  submit() {
    this.registerForm.markAllAsTouched(); // <-- Add this line
    if (this.registerForm.invalid) {
      return; // Prevent submission if form is invalid
    }
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.errmess = err.error.message;
      },
    });
  }
  confirmpassword(form: AbstractControl) {
    let password = form.get('password')?.value;
    let rePassword = form.get('rePassword')?.value;

    if (password == rePassword) {
      return null;
    } else {
      return { miMatch: true };
    }
  }
}
