import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyEnumType} from "../models/currency-enum-type";

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: any, selectedCurrency: string, exchangeRate: number): number {
    return selectedCurrency === CurrencyEnumType.USD.toString() ? value * exchangeRate : value;
  }

}
