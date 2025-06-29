import { Component, Inject, Input, LOCALE_ID, OnInit, signal } from '@angular/core';
import { ProductComponent } from "../../cards/product/product.component";
import { IProduct } from '../../../models/product/products';


@Component({
  selector: 'app-special-products-section',
  templateUrl: './special-products-section.component.html',
  styleUrls: ['./special-products-section.component.css'],
  imports: [ProductComponent]
})
export class SpecialProductsSectionComponent implements OnInit {
  @Input() specialProducts:IProduct[]|null = null;
  constructor(@Inject(LOCALE_ID) 
     public locale: string,
     
    ) { }

  ngOnInit() {

  }

}
