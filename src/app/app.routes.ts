import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { isAuthGuard } from './core/guards/is-auth-guard';
import { isLoggedInGuard } from './core/guards/is-logged-in-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayout,
    canActivate: [isLoggedInGuard],
    title: 'auth',
    children: [
      { path: 'login', loadComponent:()=>import("./pages/login/login").then((c)=>c.Login), title: 'Login' },
      { path: 'register', loadComponent:()=>import("./pages/register/register").then((c)=>c.Register), title: 'Register' },
      { path: 'forgetPassword', loadComponent:()=>import("./pages/forgetpassword/forgetpassword").then((c)=>c.Forgetpassword), title: 'Forget Password' },

    ],
  },
  {
    path: '',
    component: BlankLayout,
      canActivate: [isAuthGuard],
    title: 'blank',
    children: [
      { path: 'home', loadComponent:()=>import("./pages/home/home").then((c)=>c.Home), title: 'Home' },
      { path: 'cart', loadComponent:()=>import("./pages/cart/cart").then((c)=>c.Cart), title: 'Cart' },
      { path: 'products', loadComponent:()=>import("./pages/all-products/all-products").then((c)=>c.AllProducts), title: 'All Products' },
      { path: 'brands', loadComponent:()=>import("./pages/brands/brands").then((c)=>c.Brands), title: 'Brands' },
      { path: 'categories', loadComponent:()=>import("./pages/all-categories/categories").then((c)=>c.Categories), title: 'Categories' },
      { path: 'checkout', loadComponent:()=>import("./pages/checkout/checkout").then((c)=>c.Checkout), title: 'Checkout' },
      { path: 'details/:id', loadComponent:()=>import("./pages/product-details/details").then((c)=>c.Details), title: 'Details' },
      { path: 'address/:cartId', loadComponent:()=>import("./pages/address/address").then((c)=>c.Address), title: 'Address' },
      { path: 'allorders', loadComponent:()=>import("./pages/allorders/allorders").then((c)=>c.Allorders), title: 'All Orders', data: { prerender: false } },
      { path: '**', loadComponent:()=>import("./pages/not-found/not-found").then((c)=>c.NotFound), title: 'NotFound' },
    ],
  },
];
