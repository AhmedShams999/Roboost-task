import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ProductComponent } from '../../cards/product/product.component';
import { IProduct } from '../../../models/product/products';

@Component({
  selector: 'app-uniqe-products',
  templateUrl: './uniqe-products.component.html',
  styleUrls: ['./uniqe-products.component.css'],
  imports: [ProductComponent]
})
export class UniqeProductsComponent implements OnInit {
  @Input() uniqeProducts: IProduct[]|null = null
  constructor(
    @Inject(LOCALE_ID) 
    public locale: string,
  ) { }

  ngOnInit() {
  }

}
