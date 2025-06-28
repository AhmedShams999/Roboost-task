import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-section',
  imports:[CommonModule],
  templateUrl: './feature-section.component.html',
  styleUrls: ['./feature-section.component.css']
})
export class FeatureSectionComponent implements OnInit {
    features = [
    {
      icon: 'images/Icons/Features-icon1.svg',
      title: $localize`:@@feature.guaranteed-product:Guaranteed products`,
      description: $localize`:@@feature.guaranteed-product-des:Secure payments, installments up to 12 months`
    },
    {
      icon: 'images/Icons/Features-icon2.svg',
      title: $localize`:@@feature.free-shipping:Free shipping`,
      description: $localize`:@@feature.free-shipping-des:Secure payments, installments up to 12 months`
    },
    {
      icon: 'images/Icons/Features-icon3.svg',
      title: $localize`:@@feature.secure-payments:Secure payments`,
      description: $localize`:@@feature.secure-payments-des:Secure payments, installments up to 12 months`
    }
  ];
   products = [
    {
      image: 'images/img/product-banner2.png',
      category: $localize`:@@feature.digital-headphones-product:Digital headphones`,
      title: $localize`:@@feature.product-des:The best pure sound`,
      decorationColor: '#ff6b6b'
    },
    {
      image: 'images/img/product-banner1.png',
      category: $localize`:@@feature.digital-headphones-product:Digital headphones`,
      title: $localize`:@@feature.product-des:The best pure sound`,
      decorationColor: '#4ecdc4'
    }
  ];
  constructor(
     @Inject(LOCALE_ID) 
     public locale: string,
  ) { }

  ngOnInit() {
  }

}
