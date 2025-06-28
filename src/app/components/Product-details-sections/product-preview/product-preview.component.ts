import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent  {
  quantity: number = 1;
  isFavorite: boolean = false;

  constructor() { }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    console.log(`Added ${this.quantity} items to cart`);
    // Implement your add to cart logic here
  }

  buyNow(): void {
    console.log(`Buying ${this.quantity} items now`);
    // Implement your buy now logic here
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    console.log('Favorite toggled:', this.isFavorite);
    // Implement your favorite toggle logic here
  }

  shareProduct(): void {
    console.log('Sharing product');
    // Implement your share logic here
  }
}
