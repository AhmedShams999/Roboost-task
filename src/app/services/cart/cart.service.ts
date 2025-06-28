import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { ICartItem } from '../../models/cart/cart';
import { IProduct } from '../../models/product/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
 private readonly LOCAL_STORAGE_KEY = 'shopping_cart_items';
  private _cartItems: WritableSignal<ICartItem[]> = signal([]);

  public readonly cartItems = this._cartItems.asReadonly();
  public readonly totalItems = computed(() =>
    this._cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  public readonly cartTotal = computed(() =>
    this._cartItems().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  constructor() {
     this.loadCartFromLocalStorage();
    // Effect to save cart to localStorage whenever _cartItems changes (still needed!)
    effect(() => {
      const currentCart = this._cartItems();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(currentCart));
        console.log('Cart saved to localStorage by CartService effect:', currentCart.map(item => ({ id: item.product.id, qty: item.quantity })));
      }
    });
  }

  private loadCartFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const storedCart = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (storedCart) {
        try {
          const parsedCart: ICartItem[] = JSON.parse(storedCart);
          this._cartItems.set(parsedCart);
          console.log('Cart loaded from localStorage by CartService:', parsedCart.map(item => ({ id: item.product.id, qty: item.quantity })));
        } catch (e) {
          console.error("Error parsing cart from localStorage", e);
          this._cartItems.set([]); // Clear cart if corrupted data
        }
      }
    }
  }

  setCartItems(newCart: ICartItem[]): void {
    console.log('[CartService] Setting cart items directly from component:', newCart.map(item => ({ id: item.product.id, qty: item.quantity })));
    this._cartItems.set(newCart);
  }

  addToCart(product: IProduct): void {
    console.log(`[CartService - addToCart called directly] Attempting to add product ID: ${product.id}`);
    this._cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...items, { product, quantity: 1 }];
      }
    });
  }

  updateQuantity(productId: number, newQuantity: number): void {
    console.log(`[CartService] Updating quantity for product ID: ${productId} to ${newQuantity}`);
    this._cartItems.update(items => {
      if (newQuantity <= 0) {
        return items.filter(item => item.product.id !== productId);
      } else {
        return items.map(item =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  }

  removeProduct(productId: number): void {
    console.log(`[CartService] Removing product with ID: ${productId}`);
    this._cartItems.update((items) =>
      items.filter((item) => item.product.id !== productId)
    );
  }

  clearCart(): void {
    console.log('[CartService] Clearing the entire cart.');
    this._cartItems.set([]);
  }

  proceedToCheckout(): void {
    console.log('Proceeding to checkout with:', this.cartItems());
    alert('Proceeding to checkout!');
  }
}
