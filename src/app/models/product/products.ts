export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
}

export interface IProductResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilterParams {
  category?: string;
  brand?:string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;

}

export interface FilterOption {
  id: string;
  name: string;
  count: number;
  checked: boolean;
}

export interface ICategoryItem {
  slug: string;
  name: string;
  url: string;
}

export interface Star {
  filled: boolean;
}

export interface RatingOption {
  id: string;
  name: string;
  stars?: Star[]; 
  count: number;
  checked: boolean;
}

export interface FilterSection {
  title: string;
  expanded: boolean;
  options: (FilterOption | RatingOption)[];
}


export interface FilterSections {
  [key: string]: FilterSection;
  category: FilterSection;
  brand: FilterSection;
  rating: { 
    title: string;
    expanded: boolean;
    options: RatingOption[];
  };
  price: FilterSection;
}