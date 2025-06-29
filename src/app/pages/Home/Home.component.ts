import { Component, OnInit, signal } from '@angular/core';
import { HeroComponent } from "../../components/Home-sections/hero/hero.component";
import { FeatureSectionComponent } from "../../components/Home-sections/feature-section/feature-section.component";
import { BestOffersSectionComponent } from "../../components/Home-sections/best-offers-section/best-offers-section.component";
import { CategorySectionComponent } from "../../components/Home-sections/category-section/category-section.component";
import { CameNewSectionComponent } from "../../components/Home-sections/came-new-section/came-new-section.component";
import { AdsSectionComponent } from "../../components/Home-sections/ads-section/ads-section.component";
import { UniqeProductsComponent } from "../../components/Home-sections/uniqe-products/uniqe-products.component";
import { SpecialProductsSectionComponent } from "../../components/Home-sections/special-products-section/special-products-section.component";
import { VideoSectionComponent } from "../../components/Home-sections/video-section/video-section.component";
import { ICategoryItem, IProduct } from '../../models/product/products';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [HeroComponent, FeatureSectionComponent, BestOffersSectionComponent, CategorySectionComponent, CameNewSectionComponent, AdsSectionComponent, UniqeProductsComponent, SpecialProductsSectionComponent, VideoSectionComponent]
})
export class HomeComponent implements OnInit {
  specialProducts : IProduct[] | null= null;

  uniqeProducts : IProduct[] | null= null;
  
  cameNewProducts : IProduct[] | null= null;

   categories: ICategoryItem[] | null= null;


  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>('');

  constructor( private productService: ProductService) { }

  ngOnInit() {
    this.isLoading.set(true);
    this.productService.allProducts().subscribe({
      next: (res) => {
        this.specialProducts = res.products.slice(0, 12);
        this.uniqeProducts = res.products.slice(0,8);
        this.cameNewProducts = res.products;

        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load products.');
        this.isLoading.set(false);
      },
    });
    this.productService.getCategories().subscribe({
      next:res=>{
        this.categories = res.slice(0,7)
        console.log(this.categories);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load products.');
        this.isLoading.set(false);
      },
    })
  }

}
