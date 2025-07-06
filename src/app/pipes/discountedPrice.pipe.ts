import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountedPrice'
})
export class DiscountedPricePipe implements PipeTransform {

  transform(price: number | null | undefined, discountPercentage: number | null | undefined): number | null {
    if (price === null || price === undefined || discountPercentage === null || discountPercentage === undefined) {
      return null;
    }
    
    const discountFactor = (100 - discountPercentage) / 100;
    const discountedPrice = price * discountFactor;

    return parseFloat(discountedPrice.toFixed(2));
  }

}
