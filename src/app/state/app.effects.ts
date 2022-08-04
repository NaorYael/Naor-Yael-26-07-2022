import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, of, switchMap} from 'rxjs';

import {
  ActionTypes,
  fetchExchangeError,
  fetchProductsError,
  fetchProductsSuccess,
  updateExchangeRate
} from "./app.actions";
import {CurrencyResponseData} from '../models/currency-response-data'
import {CurrencyService} from '../services/currency.service'
import {ExchangeRateErrorResponse} from '../models/exchange-rate-error-response'
import {ProductsService} from "../services/products.service";
import {ProductResponseError} from '../models/product-response-data'

@Injectable()
export class AppEffects {
  updateExchangeRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FetchExchangeRate),
      switchMap(() => {
        return this.currencyService.getExchangeRate().pipe(
          switchMap((response: CurrencyResponseData) => {
            return of(updateExchangeRate({payload: response.exchange_rate}))

          }),
          catchError((errorResponse: ExchangeRateErrorResponse) => {
            console.log(errorResponse)
            const msg = errorResponse.error.error.message;
            return of(fetchExchangeError({message: msg}))
          }),
        )
      }),
    )
  );

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.FetchProducts),
      switchMap(() => {
        return this.productsService.getProducts().pipe(
          switchMap((result) => {
            return of(fetchProductsSuccess({payload: result}))
          }),
          catchError((errorResponse: ProductResponseError) => {
            console.log(errorResponse)
            const msg = errorResponse.message;
            return of(fetchProductsError({message: msg}))
          }),
        )
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private currencyService: CurrencyService
  ) {
  }
}
