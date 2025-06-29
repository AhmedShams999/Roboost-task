import { Component, Inject, Input, LOCALE_ID, OnChanges, OnInit } from '@angular/core';
import { ProductComponent } from "../../cards/product/product.component";
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../models/product/products';

@Component({
  selector: 'app-came-new-section',
  templateUrl: './came-new-section.component.html',
  styleUrls: ['./came-new-section.component.css'],
  imports: [ProductComponent,CommonModule]
})
export class CameNewSectionComponent implements OnInit, OnChanges {
  @Input() cameNewProducts:IProduct[]|null = null
  
  // Total number of products
  get allProducts(): number {
    return this.cameNewProducts?.length || 0;
  }

  currentIndex = 0;
  itemsToShow = 4;
  visibleProductsCount: number[] = [];

  constructor(
     @Inject(LOCALE_ID) 
     public locale: string,
  ) { }

  ngOnInit() {
      if (this.cameNewProducts) {
        this.updateVisibleProducts();
      }
  }
  ngOnChanges() {
  if (this.cameNewProducts) {
    this.currentIndex = 0; // Reset to start when products change
    this.updateVisibleProducts();
  }
}

  updateVisibleProducts() {
    this.visibleProductsCount = [];
    for (let i = 0; i < this.itemsToShow; i++) {
      const index = (this.currentIndex + i) % this.allProducts;
      this.visibleProductsCount.push(index);
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
