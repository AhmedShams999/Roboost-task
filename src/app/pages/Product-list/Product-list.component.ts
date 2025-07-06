import { Component, HostListener, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription } from 'rxjs';
import { FilterOption, FilterSections, ICategoryItem, IProduct, ProductFilterParams, RatingOption } from '../../models/product/products';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { RouteBackComponent } from '../../components/route-back/route-back.component';
import { ProductComponent } from '../../components/cards/product/product.component';
import { FormsModule } from '@angular/forms';
import { IrouteBack } from '../../models/routeBack/IrouteBack';
import { LoadingComponent } from "../../components/loading/loading.component";


@Component({
  selector: 'app-Product-list',
  templateUrl: './Product-list.component.html',
  styleUrls: ['./Product-list.component.css'],
  imports: [CommonModule, RouteBackComponent, ProductComponent, FormsModule, LoadingComponent],
})
export class ProductListComponent implements OnInit {
  products$!: IProduct[];
  categories$!: ICategoryItem[];

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>('');

  hasMoreProducts: any;
  totalProducts: any;

  routeBack: IrouteBack[] = [
      {
        routeLink: '/products',
        routeName: $localize`:@@products-list.allProductsLink:All products`,
      },
    ];
  

  selectedCategory: string = '';
  searchQuery: string = '';

  showMobileFilters: boolean = false;
  
  private searchInputSubject = new Subject<string>(); 

  sections: FilterSections = {
    category: {
      title: $localize`:@@products-list.category:category`, // Category in Arabic
      expanded: true,
      options: [
        { id: 'all', name: $localize`:@@products-list.all:All`, count: 0, checked: true }, // Placeholder, count will be updated
      ],
    },
    brand: {
      title: $localize`:@@products-list.brand:Brand`, // Brand in Arabic
      expanded: true,
      options: [
        { id: 'all-brands', name: $localize`:@@products-list.all:All`, count: 0, checked: true },
        // Dummy data for brands, dummyjson does not provide a brand list
        { id: 'Apple', name: 'Apple', count: 0, checked: false },
        { id: 'Samsung', name: 'Samsung', count: 0, checked: false },
        { id: 'Dell', name: 'Dell', count: 0, checked: false },
        { id: 'Lenovo', name: 'Lenovo', count: 0, checked: false },
      ],
    },
    rating: {
      title: $localize`:@@products-list.rateing:Rateing`, // Rating in Arabic
      expanded: true,
      options: [
        {
          id: 'all-rating',
          name: $localize`:@@products-list.all:All`,
          stars: [
            { filled: true },
            { filled: true },
            { filled: true },
            { filled: true },
            { filled: true },
          ],
          count: 0,
          checked: true,
        },
        {
          id: '5-star',
          name: $localize`:@@products-list.5-star:5-star`,
          stars: [
            { filled: true },
            { filled: true },
            { filled: true },
            { filled: true },
            { filled: true },
          ],
          count: 0,
          checked: false,
        },
        {
          id: '4-star',
          name: $localize`:@@products-list.4-star:4-star`,
          stars: [
            { filled: true },
            { filled: true },
            { filled: true },
            { filled: true },
            { filled: false },
          ],
          count: 0,
          checked: false,
        },
        {
          id: '3-star',
          name: $localize`:@@products-list.3-star:3-star`,
          stars: [
            { filled: true },
            { filled: true },
            { filled: true },
            { filled: false },
            { filled: false },
          ],
          count: 0,
          checked: false,
        },
        {
          id: '2-star',
          name: $localize`:@@products-list.2-star:2-star`,
          stars: [
            { filled: true },
            { filled: true },
            { filled: false },
            { filled: false },
            { filled: false },
          ],
          count: 0,
          checked: false,
        },
        {
          id: '1-star',
          name: $localize`:@@products-list.1-star:1-star`,
          stars: [
            { filled: true },
            { filled: false },
            { filled: false },
            { filled: false },
            { filled: false },
          ],
          count: 0,
          checked: false,
        },
      ],
    },
    price: {
      title: $localize`:@@products-list.price:Price`, // Price in Arabic
      expanded: true,
      options: [], // Options will be derived from priceRange
    },
  };

  priceRange = {
    min: 1,
    max: 20, 
  };

  selectedPriceRange = {
    min: this.priceRange.min,
    max: this.priceRange.max,
  };

  private searchSubscription: Subscription | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.hasMoreProducts = this.productService.hasMoreProducts;
    this.totalProducts = this.productService.totalProducts;

    this.isLoading.set(true);

    this.productService.products$.subscribe({
      next: (res) => {
        this.products$ = res;
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load products.');
        this.isLoading.set(false);
      },
    });

    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories$ = categories;
        categories.forEach((cat) => {
          this.sections.category.options.push({
            id: cat.name,
            name: cat.name.charAt(0).toUpperCase() + cat.name.slice(1), 
            count: 0,
            checked: false,
          });
        });
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load categories.');
      },
    });

    this.searchSubscription = this.searchInputSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.executeSearch(searchTerm);
    });

    this._applyAllFilters();
  }

  onLoadMore(): void {
    this.isLoading.set(true);
    this.productService.loadMoreProducts();
  }

  toggleSection(sectionKey: keyof typeof this.sections): void {
    this.sections[sectionKey].expanded = !this.sections[sectionKey].expanded;
  }

  onFilterChange(
    sectionKey: keyof typeof this.sections,
    option: FilterOption | RatingOption
  ): void {
    const options = this.sections[sectionKey].options;

    options.forEach((opt) => (opt.checked = false));

    option.checked = true;

    this._applyAllFilters();
  }

  onPriceRangeChange(): void {
    // Ensure min does not exceed max, and vice versa
    if (this.selectedPriceRange.min > this.selectedPriceRange.max) {
      this.selectedPriceRange.min = this.selectedPriceRange.max;
    }
    if (this.selectedPriceRange.max < this.selectedPriceRange.min) {
      this.selectedPriceRange.max = this.selectedPriceRange.min;
    }
    this._applyAllFilters();
  }

  onMinChange(event: any) {
    const value = parseInt(event.target.value);
    if (value <= this.selectedPriceRange.max) {
      this.selectedPriceRange.min = value;
    }
  }

  onMaxChange(event: any) {
    const value = parseInt(event.target.value);
    if (value >= this.selectedPriceRange.min) {
      this.selectedPriceRange.max = value;
    }
  }

  getMinPercent(): number {
    const range = this.priceRange.max - this.priceRange.min;
    if (range === 0) return 0; 
    return ((this.selectedPriceRange.min - this.priceRange.min) / range) * 100;
  }

  getMaxPercent(): number {
    const range = this.priceRange.max - this.priceRange.min;
    if (range === 0) return 0; 
    return (
      100 - ((this.selectedPriceRange.max - this.priceRange.min) / range) * 100
    );
  }

  onSearchInput(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchQuery = searchTerm;
    console.log(this.searchQuery);
    this.resetAllFiltersToDefault();

    this.searchInputSubject.next(searchTerm);
  }

  toggleMobileFilters(): void {
    this.showMobileFilters = !this.showMobileFilters;

    if (this.showMobileFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMobileFilters(): void {
    this.showMobileFilters = false;
    document.body.style.overflow = 'auto';
  }

  getTotalPageAfterLoadMore(): number{
    if(this.products$){
      return this.totalProducts() - this.products$.length;
    }
    return this.totalProducts();
  }

  // Close mobile filters when clicking outside or on escape
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(): void {
    if (this.showMobileFilters) {
      this.closeMobileFilters();
    }
  }

  // Close filters on window resize to desktop
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth > 768 && this.showMobileFilters) {
      this.closeMobileFilters();
    }
  }

  getActiveFiltersCount(): number {
    let count = 0;
    
    // Count category filters
    count += this.sections.category.options.filter(option => option.checked).length;
    
    // Count brand filters
    count += this.sections.brand.options.filter(option => option.checked).length;
    
    // Count rating filters
    count += this.sections.rating.options.filter(option => option.checked).length;
    
    
    if (this.selectedPriceRange.min !== this.priceRange.min || 
        this.selectedPriceRange.max !== this.priceRange.max) {
      count += 1;
    }
    
   
    if (this.searchQuery && this.searchQuery.trim().length > 0) {
      count += 1;
    }
    
    return count;
  }

  clearAllFilters(): void {
    // Clear search
    this.searchQuery = '';
    this.resetAllFiltersToDefault();
    
    // Apply filters (your existing logic)
    this._applyAllFilters();
  }

  private executeSearch(searchTerm: string): void {
    this.isLoading.set(true);
    this.productService.searchProducts(searchTerm);
  }

  private resetAllFiltersToDefault(): void {
    Object.keys(this.sections).forEach((key) => {
      const section = this.sections[key];
      if (section.options && section.options.length > 0) {
        // Reset all options to unchecked, then check the 'all' option if it exists
        section.options.forEach((opt) => (opt.checked = false));
        const allOption = section.options.find((opt) => opt.id.includes('all'));
        if (allOption) {
          allOption.checked = true;
        }
      }
    });
    this.selectedPriceRange = { ...this.priceRange }; // Reset price range to full default
  }

  private _applyAllFilters(): void {
    const filters: ProductFilterParams = {};
    const selectedCatOption = this.sections.category.options.find(
      (opt) => opt.checked && opt.id !== 'all'
    );

    console.log("selected cat",selectedCatOption);
    if (selectedCatOption) {
      filters.category = selectedCatOption.id;
    }

    const selectedBrandOption = this.sections.brand.options.find(
      (opt) => opt.checked && opt.id !== 'all-brands'
    );
    if (selectedBrandOption) {
      // filters.brand = selectedBrandOption.name; // Uncomment if your backend supports this
    }

    const selectedRatingOption = this.sections.rating.options.find(
      (opt) => opt.checked && opt.id !== 'all-rating'
    ) as RatingOption;
    
    if (selectedRatingOption) {
      const minRating = parseInt(selectedRatingOption.id.split('-')[0]);
      if (!isNaN(minRating)) {
        filters.minRating = minRating;

        filters.maxRating = minRating === 5 ? 5 : minRating + 0.99;
      }
    }

    filters.minPrice = this.selectedPriceRange.min;
    filters.maxPrice = this.selectedPriceRange.max;


    this.isLoading.set(true);

    console.log(filters);
    this.productService.applyFilters(filters);
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
