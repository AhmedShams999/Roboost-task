import { Component, computed, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../models/product/products';
import { CurrencyPipe } from '@angular/common';
import { DiscountedPricePipe } from '../../../pipes/discountedPrice.pipe';
import { CartService } from '../../../services/cart/cart.service';
import { ICartItem } from '../../../models/cart/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports:[CurrencyPipe,DiscountedPricePipe]
})
export class ProductComponent implements OnInit {
  @Input() product:IProduct|null = null;
  constructor(private cartService:CartService,private router:Router) { }

  ngOnInit() {
  }


  addToCart(product:IProduct |null):void{
    if(product){
      let currentCart: ICartItem[] = [];

      if (typeof localStorage !== 'undefined') {
        const storedCart = localStorage.getItem('shopping_cart_items');
        if (storedCart) {
          try {
            currentCart = JSON.parse(storedCart);
            console.log('[ProductComponent] Cart loaded from localStorage:', currentCart.map(item => ({ id: item.product.id, qty: item.quantity })));
          } catch (e) {
            console.error('Error parsing cart from localStorage in ProductComponent', e);
            currentCart = [];
          }
        }
      }
      
      let updatedCart: ICartItem[];
      const existingItemIndex = currentCart.findIndex(item => Number(item.product.id) === Number(product.id)); // IMPORTANT: Ensure type consistency here!

      if (existingItemIndex > -1) {
        
        updatedCart = [...currentCart]; // Create a shallow copy to avoid direct mutation
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        console.log(`[ProductComponent] Incremented quantity for existing product ID: ${product.id}`);
      } else {
        updatedCart = [...currentCart, { product: product, quantity: 1 }];
        console.log(`[ProductComponent] Added new product ID: ${product.id}`);
      }

      // Send the entire updated cart back to the CartService to set its internal signal
      this.cartService.setCartItems(updatedCart);
      console.log('[ProductComponent] Sent updated cart to CartService.');
    }
  }

  goToProductDetails(productId:number|null):void{
    this.router.navigate([`products/${productId}`])
  }
}
