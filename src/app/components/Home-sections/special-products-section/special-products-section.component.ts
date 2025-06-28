import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ProductComponent } from "../../cards/product/product.component";

@Component({
  selector: 'app-special-products-section',
  templateUrl: './special-products-section.component.html',
  styleUrls: ['./special-products-section.component.css'],
  imports: [ProductComponent]
})
export class SpecialProductsSectionComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) 
     public locale: string) { }

  ngOnInit() {
  }

}
