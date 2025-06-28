import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, scan, switchMap, tap, throwError } from 'rxjs';
import { ICategoryItem, IProduct, IProductResponse, ProductFilterParams } from '../../models/product/products';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com'

  private productLimit = 10;

  private currentSkipSubject = new BehaviorSubject<number>(0);

  private currentFilterSubject = new BehaviorSubject<Omit<ProductFilterParams,'limit'|'skip'|'searchQuery'>>({});

  private currentSearchQuerySubject = new BehaviorSubject<string>('');

  private _totalProducts = signal(0);

  totalProducts = this._totalProducts.asReadonly();

  // check if we can load more products

  hasMoreProducts = computed(()=>{
    const currentSkip = this.currentSkipSubject.getValue();
    const total = this._totalProducts();

    return (currentSkip + this.productLimit) < total;
  })


  private productRes$: Observable<IProductResponse> = combineLatest([
    this.currentSkipSubject,
    this.currentFilterSubject,
    this.currentSearchQuerySubject
  ]).pipe(

    switchMap(([skip,filters,searchQuery])=>{
      let params = new HttpParams()
        .set('limit',this.productLimit)
        .set('skip',skip)
      
      let url = `${this.apiUrl}/products`

      if(searchQuery){
        url = `${this.apiUrl}/products/search`
        params = params.set('q',searchQuery)
      }else if (filters.category) {
        url = `${this.apiUrl}/products/category/${filters.category}`; // Use category endpoint
      }

      return this.http.get<IProductResponse>(url, { params }).pipe(
        tap(res=>{
          this._totalProducts.set(res.total);
         
        }),
        map(res => {
          let filteredProducts = res.products;
          if (filters.minRating !== undefined || filters.maxRating !== undefined) {
            filteredProducts = filteredProducts.filter(product => {
              const meetsMinRating = filters.minRating === undefined || product.rating >= filters.minRating;
              const meetsMaxRating = filters.maxRating === undefined || product.rating <= filters.maxRating;
              return meetsMinRating && meetsMaxRating;
            });
            console.log('Client-side rating filtered products:', filteredProducts);
          }

          // Return a new res object with the filtered products.
          // The 'total' from the API is maintained, which is a known limitation for infinite scroll
          // when filtering client-side.
          return { ...res, products: filteredProducts };
        }),
        tap(res=>{
           console.log('API response for products:', res);
        }),
        catchError(this.handleError)
      )
    })

  )

  products$: Observable<IProduct[]> = this.productRes$.pipe(
    scan((acc:IProduct[],res:IProductResponse)=>{
        const currentSkip = this.currentSkipSubject.getValue();
        return currentSkip === 0 ? res.products : [...acc,...res.products]
    },[])
  )

  constructor(private http: HttpClient) { }


  getCategories(): Observable<ICategoryItem[]> {
    return this.http.get<ICategoryItem[]>(`${this.apiUrl}/products/categories`).pipe(
      catchError(this.handleError)
    );
  }

  searchProducts(query:string):void{
    this.currentSearchQuerySubject.next(query);

    this.currentFilterSubject.next({});

    this.currentSkipSubject.next(0);
  }

  applyFilters(filters: Omit<ProductFilterParams, 'limit' | 'skip' | 'searchQuery'>): void {
    // Update the filters subject, which will trigger a new API call
    this.currentFilterSubject.next(filters);
    // Clear any active search query when filters are applied
    this.currentSearchQuerySubject.next('');
    // Reset pagination to start from the beginning of filtered results
    this.currentSkipSubject.next(0);
  }

  loadMoreProducts():void{
    const currentSkip = this.currentSkipSubject.getValue()
    const newSkip = currentSkip + this.productLimit;

    if(newSkip < this._totalProducts()){
      this.currentSkipSubject.next(newSkip);
    }else{
      console.log('No more products to load as all available products have been fetched.');
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An HTTP error occurred:', error);
    let errorMessage = 'An unknown error occurred. Please try again later.';

    // Check for client-side or network errors (ErrorEvent)
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network Error: ${error.error.message}. Please check your internet connection.`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain more specific error messages.
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: The request was malformed or invalid.';
          break;
        case 401:
          errorMessage = 'Unauthorized: Authentication is required or has failed.';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource could not be found.';
          break;
        case 429:
          errorMessage = 'Too Many Requests: Please try again later.';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Something went wrong on the server.';
          break;
        default:
          // Attempt to get a more specific message from the error body if available
          errorMessage = `Server Error (${error.status}): ${error.error?.message || error.message || 'Unknown server response'}`;
          break;
      }
    }
    // Re-throw the error with the constructed user-friendly message
    return throwError(() => new Error(errorMessage));
  }
}
