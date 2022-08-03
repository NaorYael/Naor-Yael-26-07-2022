import {createReducer, on} from "@ngrx/store";
import {
  add,
  archive,
  fetchExchangeError,
  fetchProductsError,
  fetchProductsSuccess,
  reactive,
  updateCurrencyType,
  updateExchangeRate
} from "./app.actions";
import {CurrencyEnumType} from "../models/currency-enum-type";
import {ProductsResponseData} from "../models/product-response-data";
import {Item} from "../models/item";

export interface CurrencyState {
  exchangeRate: number;
  selectedCurrency: CurrencyEnumType;
  errorMessage: string
}

export interface ProductState {
  products: ProductsResponseData[];
  errorMessage: string
}

export const initialStateCurrency: Readonly<CurrencyState> = {
  exchangeRate: 3.5,
  selectedCurrency: CurrencyEnumType.ILS,
  errorMessage: ''
};
export const initialStateProducts: Readonly<ProductState> = {products: [], errorMessage: ''};
export const initialStateItems: ReadonlyArray<Item> = [];

export const currencyReducer = createReducer(initialStateCurrency,
  on(updateExchangeRate, (state, {payload}) => {
    return {...state, exchangeRate: payload}
  }),
  on(updateCurrencyType, (state, {payload}) => {
    return {...state, selectedCurrency: payload}
  }),
  on(fetchExchangeError, (state, error) => {
    return {...state, errorMessage: error.message}
  })
);

export const productsReducer = createReducer(initialStateProducts,
  on(fetchProductsSuccess, (state, data) => {
    return {...state, products: data.payload}
  }),
  on(fetchProductsError, (state, error) => {
    return {...state, errorMessage: error.message}
  })
);

export const itemsReducer = createReducer(initialStateItems,
  on(add, (state, {payload}) => [...state, payload]),
  on(archive, (state, {payload}) => {
    return [...updateIsArchiveOnItem(state, payload, true)]
  }),
  on(reactive, (state, {payload}) => {
    return [...updateIsArchiveOnItem(state, payload, false)]
  }),
);

function updateIsArchiveOnItem(state: ReadonlyArray<Item>, item: Item, isArchived: boolean) {
  const items = [...state];
  const index = items.indexOf(item);

  if (index !== -1) {
    items[index] = {...items[index], isArchived}
  }
  return items;
}

