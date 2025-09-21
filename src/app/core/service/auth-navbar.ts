import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthNavbar {
   private isAuthenticated = false;
  login() {
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');
  }
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }
  checkAuthentication() {
    return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  }
}
