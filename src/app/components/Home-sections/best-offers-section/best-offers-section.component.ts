import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-offers-section',
  templateUrl: './best-offers-section.component.html',
  styleUrls: ['./best-offers-section.component.css'],
  imports:[NgStyle]
})
export class BestOffersSectionComponent implements OnInit {
  @Input() whichToShow!:string;
   slides = [
    {
      image: '/images/img/Banner.png',
      alt: 'Laptop deals'
    },
    {
      image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=1200&h=800&fit=crop',
      alt: 'Tech gadgets'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      alt: 'Smartphone deals'
    },
    {
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop',
      alt: 'Shoes collection'
    }
  ];

  currentSlide = 0;
  constructor() { }

  ngOnInit() {
  }

}
