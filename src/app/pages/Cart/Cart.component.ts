import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { RouteBackComponent } from '../../components/route-back/route-back.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { ICartItem } from '../../models/cart/cart';
import { DiscountedPricePipe } from '../../pipes/discountedPrice.pipe';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css'],
  imports: [RouteBackComponent, CommonModule,DiscountedPricePipe],
})
export class CartComponent implements OnInit {
  constructor(
    @Inject(LOCALE_ID)
    public locale: string,
    private cartService: CartService
  ) {}

  get cartItems(): ICartItem[] | null {
    return this.cartService.cartItems();
  }

  get totalItems(): number | null {
    return this.cartService.totalItems();
  }
  get cartTotal(): string | null {
    return this.cartService.cartTotal();
  }
  ngOnInit(): void {}

  onQuantityChange(item: ICartItem, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let newQuantity = parseInt(inputElement.value, 10);

    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
      inputElement.value = '1';
    }
    this.cartService.updateQuantity(item.product.id, newQuantity);
  }

  incrementQuantity(item: ICartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decrementQuantity(item: ICartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.quantity - 1);
    } else {
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToCheckout(): void {
    this.cartService.proceedToCheckout();
    // Potentially navigate to a checkout route here
  }
  // getTotalItems(): number {
  //   return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  // }

  // getSubtotal(): number {
  //   return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  // }

  // getTotalShipping(): number {
  //   return this.cartItems.reduce((total, item) => total + item.shipping, 0);
  // }

  // getTotal(): number {
  //   return this.getSubtotal() + this.getTotalShipping();
  // }

  formatPrice(price: number): string {
    return '$' + price.toFixed(2);
  }
}
