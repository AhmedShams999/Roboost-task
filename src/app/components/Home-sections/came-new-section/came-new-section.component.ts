import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ProductComponent } from "../../cards/product/product.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-came-new-section',
  templateUrl: './came-new-section.component.html',
  styleUrls: ['./came-new-section.component.css'],
  imports: [ProductComponent,CommonModule]
})
export class CameNewSectionComponent implements OnInit {
 
  // Total number of products
  allProducts = 12;

  currentIndex = 0;
  itemsToShow = 4;
  visibleProductsCount: number[] = [];

  constructor(
     @Inject(LOCALE_ID) 
     public locale: string,
  ) { }

  ngOnInit() {
    this.updateVisibleProducts();
  }

  updateVisibleProducts() {
    this.visibleProductsCount = [];
    for (let i = 0; i < this.itemsToShow; i++) {
      const index = (this.currentIndex + i) % this.allProducts;
      this.visibleProductsCount.push(index + 1); // Adding 1 to make it 1-based instead of 0-based
    }
  }

  slideNext() {
    this.currentIndex = (this.currentIndex + this.itemsToShow) % this.allProducts;
    this.updateVisibleProducts();
  }

  slidePrev() {
    this.currentIndex = this.currentIndex - this.itemsToShow;
    if (this.currentIndex < 0) {
      this.currentIndex = this.allProducts - this.itemsToShow;
    }
    this.updateVisibleProducts();
  }

  // Check if buttons should be disabled
  get canSlidePrev(): boolean {
    return this.allProducts > this.itemsToShow;
  }

  get canSlideNext(): boolean {
    return this.allProducts > this.itemsToShow;
  }

  // TrackBy function for better performance
  trackByIndex(index: number, item: number): number {
    return item;
  }

}
