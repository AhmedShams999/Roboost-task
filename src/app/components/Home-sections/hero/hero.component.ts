import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports:[CommonModule],
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
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
  autoSlideInterval: any;

  constructor(
    @Inject(LOCALE_ID) 
    public locale: string,
  ){

  }
  ngOnInit() {
    
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

}
