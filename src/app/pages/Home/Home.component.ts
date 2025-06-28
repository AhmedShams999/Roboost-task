import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../../components/Home-sections/hero/hero.component";
import { FeatureSectionComponent } from "../../components/Home-sections/feature-section/feature-section.component";
import { BestOffersSectionComponent } from "../../components/Home-sections/best-offers-section/best-offers-section.component";
import { CategorySectionComponent } from "../../components/Home-sections/category-section/category-section.component";
import { CameNewSectionComponent } from "../../components/Home-sections/came-new-section/came-new-section.component";
import { AdsSectionComponent } from "../../components/Home-sections/ads-section/ads-section.component";
import { UniqeProductsComponent } from "../../components/Home-sections/uniqe-products/uniqe-products.component";
import { SpecialProductsSectionComponent } from "../../components/Home-sections/special-products-section/special-products-section.component";
import { VideoSectionComponent } from "../../components/Home-sections/video-section/video-section.component";

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [HeroComponent, FeatureSectionComponent, BestOffersSectionComponent, CategorySectionComponent, CameNewSectionComponent, AdsSectionComponent, UniqeProductsComponent, SpecialProductsSectionComponent, VideoSectionComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
