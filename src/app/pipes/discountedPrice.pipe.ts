import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountedPrice'
})
export class DiscountedPricePipe implements PipeTransform {

  transform(price: number | null | undefined, discountPercentage: number | null | undefined): number | null {
    if (price === null || price === undefined || discountPercentage === null || discountPercentage === undefined) {
      return null;
    }

    // Ensure discountPercentage is treated as a percentage
    const discountFactor = (100 - discountPercentage) / 100;
    const discountedPrice = price * discountFactor;

    // Optional: Round to two decimal places for currency
    return parseFloat(discountedPrice.toFixed(2));
  }

}
