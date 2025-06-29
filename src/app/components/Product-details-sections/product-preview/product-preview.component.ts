import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../models/product/products';
import { CartService } from '../../../services/cart/cart.service';
import { ICartItem } from '../../../models/cart/cart';
import { DiscountedPricePipe } from '../../../pipes/discountedPrice.pipe';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css'],
  imports: [DiscountedPricePipe]
})
export class ProductPreviewComponent implements OnInit {
  @Input() product: IProduct | null = null;
  selectedImageUrl: string | null = null; 

  quantityToAdd: number = 1;
  isFavorite: boolean = false;

  constructor(private cartService: CartService) {}

    ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      if (this.product?.images && this.product.images.length > 0) {
        this.selectedImageUrl = this.product.images[0];
        console.log('[ProductPreviewComponent] Default selected image set in ngOnChanges:', this.selectedImageUrl);
      } 
    }
  }
  ngOnInit(): void {
  }
   getFilledStarsArray(): number[] {

    return Array.from(Array(Math.floor(this.product?.rating || 0)).keys());
  }

  getEmptyStarsArray(): number[] {

    const filledStars = Math.floor(this.product?.rating || 0);
    const totalStars = 5;
    const emptyStars = totalStars - filledStars;
    return Array.from(Array(emptyStars).keys());
  }
  selectImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
    console.log('Selected image:', imageUrl);
  }
  increaseQuantityToAdd(): void {
    this.quantityToAdd++;
    console.log(`Quantity to add/process: ${this.quantityToAdd}`);
  }

  decrementQuantityToAdd(): void {
    if (this.quantityToAdd > 1) {
      this.quantityToAdd--;
      console.log(`Quantity to add/process: ${this.quantityToAdd}`);
    }
  }


  private getCurrentCart(): ICartItem[] {
    if (typeof localStorage === 'undefined') {
      return []; 
    }
    const storedCart = localStorage.getItem('shopping_cart_items');
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        return [];
      }
    }
    return [];
  }

  addToCart(product: IProduct | null): void {
    if (!product) {
      console.warn('Cannot add to cart: product is null.');
      return;
    }

    let currentCart: ICartItem[] = this.getCurrentCart();
    const existingItemIndex = currentCart.findIndex(
      (item: ICartItem) => Number(item.product.id) === Number(product.id)
    );

    if (existingItemIndex > -1) {

      currentCart[existingItemIndex].quantity += this.quantityToAdd;
      console.log(`[ProductPreviewComponent] Incremented quantity for existing product ID: ${product.id} by ${this.quantityToAdd}. New total: ${currentCart[existingItemIndex].quantity}`);
    } else {

      currentCart.push({ product: product, quantity: this.quantityToAdd });
      console.log(`[ProductPreviewComponent] Added new product ID: ${product.id} with initial quantity ${this.quantityToAdd}`);
    }


    this.quantityToAdd = 1;


    this.cartService.setCartItems(currentCart);
    console.log('[ProductPreviewComponent] Sent updated cart to CartService.');
  }

  buyNow(): void {
    console.log(`Buying ${this.quantityToAdd} units of ${this.product?.title} now`);

    if (this.product) {
      this.addToCart(this.product);

    }
  }

  removeItem(productId: number): void {

    this.cartService.removeProduct(productId);
    console.log(`[ProductPreviewComponent] Removed product ID: ${productId} from cart.`);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    console.log('Favorite toggled:', this.isFavorite);

  }

  shareProduct(): void {
    console.log('Sharing product');

  }
}