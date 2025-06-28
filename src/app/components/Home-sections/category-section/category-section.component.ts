import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CategoryComponent } from "../../cards/category/category.component";

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.css'],
  imports: [CategoryComponent]
})
export class CategorySectionComponent implements OnInit {
  categoryData:any=[
    {
      img:'/images/img/test-category.png',
      categoryName: $localize`:@@category.earphones:Earphones`,
    },
    {
      img:'/images/img/test-category2.png',
      categoryName: $localize`:@@category.computer-screens:Computer screens`
    },
    {
      img:'/images/img/test-category3.png',
      categoryName: $localize`:@@category.mobiles:Mobiles`
    },
    {
      img:'/images/img/test-category4.png',
      categoryName: $localize`:@@category.digital-watches:Digital watches`
    },
    {
      img:'/images/img/test-category5.png',
      categoryName: $localize`:@@category.headphones:Headphones`
    },
    {
      img:'/images/img/test-category6.png',
      categoryName: $localize`:@@category.laptops:Laptops`
    },
    {
      img:'/images/img/test-category.png',
      categoryName: $localize`:@@category.earphones:Earphones`
    }
  ]
  constructor(
    @Inject(LOCALE_ID) 
     public locale: string,
  ) { }

  ngOnInit() {
  }

}
