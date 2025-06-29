import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [CommonModule],
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  slides = [
    {
      image: 'images/img/Banner.png',
      alt: 'Laptop deals'
    },
    {
      image: 'images/img/Banner.png',
      alt: 'Tech gadgets'
    },
    {
      image: 'images/img/Banner.png',
      alt: 'Smartphone deals'
    },
    {
      image: 'images/img/Banner.png',
      alt: 'Shoes collection'
    }
  ];

  currentSlide = 0;
  autoSlideInterval: any;

  constructor(
    @Inject(LOCALE_ID)
    public locale: string,
  ) { }

  ngOnInit() {
    this.preloadImages();
    this.startAutoSlide(); // Start auto-sliding when the component initializes
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

  startAutoSlide() {
    this.stopAutoSlide(); // Clear any existing interval before starting a new one
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Pause auto-slide on hover
  onMouseEnter() {
    this.stopAutoSlide();
  }

  onMouseLeave() {
    this.startAutoSlide();
  }

  private preloadImages() {
    this.slides.forEach((slide, index) => {
      const img = new Image();
      img.onload = () => {
        console.log(`Image ${index + 1} loaded successfully: ${slide.image}`);
      };
      img.onerror = () => {
        console.error(`Image ${index + 1} failed to load: ${slide.image}`);
        // Fallback to a placeholder image
        slide.image = 'https://via.placeholder.com/1200x600/cccccc/666666?text=Image+Not+Found';
      };
      img.src = slide.image;
    });
  }
}