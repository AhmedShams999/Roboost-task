import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ProductComponent } from '../../cards/product/product.component';

@Component({
  selector: 'app-uniqe-products',
  templateUrl: './uniqe-products.component.html',
  styleUrls: ['./uniqe-products.component.css'],
  imports: [ProductComponent]
})
export class UniqeProductsComponent implements OnInit {

  constructor(
    @Inject(LOCALE_ID) 
    public locale: string,
  ) { }

  ngOnInit() {
  }

}
