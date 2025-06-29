import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ProductComponent } from "../../cards/product/product.component";
import { ProductService } from '../../../services/product/product.service';
import { IProduct } from '../../../models/product/products';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css'],
  imports: [ProductComponent]
})
export class SimilarProductsComponent implements OnInit {

  @Input() productCategory:string | null = null 
  similarProducts:IProduct[] | null = null
  
  constructor(
    @Inject(LOCALE_ID) 
     public locale: string,
     private productService: ProductService
  ) { }

  ngOnInit() {
     this.productService.getsimilarProducts(this.productCategory).subscribe({
      next: res=>{
        this.similarProducts = res;
        console.log(this.similarProducts);
      }
     })
  }

}
