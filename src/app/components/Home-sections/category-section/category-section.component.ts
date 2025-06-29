import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { CategoryComponent } from "../../cards/category/category.component";
import { ICategoryItem } from '../../../models/product/products';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.css'],
  imports: [CategoryComponent]
})
export class CategorySectionComponent implements OnInit {
  @Input() categories:ICategoryItem[]|null = null;

  categoryData:any=[
    {
      url:'images/img/test-category.png',
      name: $localize`:@@category.earphones:Earphones`,
    },
    {
      url:'images/img/test-category2.png',
      name: $localize`:@@category.computer-screens:Computer screens`
    },
    {
      url:'images/img/test-category3.png',
      name: $localize`:@@category.mobiles:Mobiles`
    },
    {
      url:'images/img/test-category4.png',
      name: $localize`:@@category.digital-watches:Digital watches`
    },
    {
      url:'images/img/test-category5.png',
      name: $localize`:@@category.headphones:Headphones`
    },
    {
      url:'images/img/test-category6.png',
      name: $localize`:@@category.laptops:Laptops`
    },
    {
      url:'images/img/test-category.png',
      name: $localize`:@@category.earphones:Earphones`
    }
  ]

  constructor(
    @Inject(LOCALE_ID) 
     public locale: string,
  ) { }

  ngOnInit() {

  }

}
