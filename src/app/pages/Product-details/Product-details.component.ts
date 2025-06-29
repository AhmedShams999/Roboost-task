import { Component, OnInit } from '@angular/core';
import { ProductPreviewComponent } from "../../components/Product-details-sections/product-preview/product-preview.component";
import { RouteBackComponent } from "../../components/route-back/route-back.component";
import { ProductInfoComponent } from "../../components/Product-details-sections/product-info/product-info.component";
import { SimilarProductsComponent } from "../../components/Product-details-sections/similar-products/similar-products.component";
import { IrouteBack } from '../../models/routeBack/IrouteBack';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../models/product/products';

@Component({
  selector: 'app-Product-details',
  templateUrl: './Product-details.component.html',
  styleUrls: ['./Product-details.component.css'],
  imports: [ProductPreviewComponent, RouteBackComponent, ProductInfoComponent, SimilarProductsComponent]
})
export class ProductDetailsComponent implements OnInit {
   routeBack : IrouteBack[] = [
      {
        routeLink: '/products',
        routeName: $localize`:@@route-back.all-products:All products`
      },
      {
        routeLink: '/products/1',
        routeName: $localize`:@@route-back.Product-details:Product details`
      }
      
    ]
    product:IProduct|null = null;
   productId: string | null = null;
  constructor(private route: ActivatedRoute,private productService:ProductService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId');
    console.log('Product ID (snapshot):', this.productId);
    this.productService.getProductDetails(this.productId).subscribe({
      next: res=>{
        console.log(res);
        this.product = res
      }
    })
  }

}
