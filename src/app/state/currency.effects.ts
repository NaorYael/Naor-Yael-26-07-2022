import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, of, switchMap} from 'rxjs';

import {ActionTypes, fetchExchangeError, updateExchangeRate} from "./items.actions";
import {CurrencyResponseData} from '../models/currency-response-data'
import {CurrencyService} from '../services/currency.service'
import {ExchangeRateErrorResponse} from '../models/exchange-rate-error-response'

@Injectable()
export class CurrencyEffects {
    updateExchangeRate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.FetchExchangeRate),
            switchMap(() => {
                return this.currencyService.getExchangeRate().pipe(
                    switchMap((response: CurrencyResponseData) => {
                        return of(updateExchangeRate({payload: response.exchange_rate}))

                    }),
                    catchError((res: ExchangeRateErrorResponse) => {
                        return of(fetchExchangeError({payload: res.error.message}))
                    }),
                )
            }),
        )
    );

    constructor(
        private actions$: Actions,
        private currencyService: CurrencyService
    ) {
    }
}
