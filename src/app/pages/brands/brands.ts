import { Brand, Product } from '../../core/interface/products';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../core/service/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.css'
})
export class Brands {
  allBrands:Brand[]=[]
  constructor(private AllBrands: Products) {}
  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands() {
    this.AllBrands.getBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.allBrands=res.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
