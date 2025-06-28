import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ProductComponent } from "../../cards/product/product.component";

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css'],
  imports: [ProductComponent]
})
export class SimilarProductsComponent implements OnInit {

  constructor(
    @Inject(LOCALE_ID) 
     public locale: string
  ) { }

  ngOnInit() {
  }

}
