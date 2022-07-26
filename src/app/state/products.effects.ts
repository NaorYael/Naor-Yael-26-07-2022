import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, of, switchMap} from 'rxjs';

import {ActionTypes, fetchProductsError, fetchProductsSuccess} from "./items.actions";
import {ProductsService} from "../services/products.service";

@Injectable()
export class ProductsEffects {
    fetchProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.FetchProducts),
            switchMap(() => {
                return this.productsService.getProducts().pipe(
                    switchMap((result) => {
                        return of(fetchProductsSuccess({payload: result}))
                    }),
                    catchError((res) => {
                        const {message, error} = res.error;
                        return of(fetchProductsError({payload: message ? message : error}))
                    }),
                )
            })
        )
    );

    constructor(
        private actions$: Actions,
        private productsService: ProductsService
    ) {
    }
}
