import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceReduced'
})
export class PriceReducedPipe implements PipeTransform {

  transform(value: number, discount: number): number {
    return Math.round((value - value * (discount/100)));
  }

}
