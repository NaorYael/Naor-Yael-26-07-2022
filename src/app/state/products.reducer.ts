import {createReducer, on} from "@ngrx/store";
import {fetchProductsSuccess} from "./items.actions";
import {ProductsResponseData} from '../models/product-response-data'

export const initialState: Readonly<ProductState> = {products: []};

export const productsReducer = createReducer(initialState,
    on(fetchProductsSuccess, (state, data) => {
        return {...state, products: data.payload}
    })
);

export interface ProductState {
    products: ProductsResponseData[];
}
