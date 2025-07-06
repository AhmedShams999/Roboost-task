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

}
