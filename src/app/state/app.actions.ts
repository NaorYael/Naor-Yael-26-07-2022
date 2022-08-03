import {createAction, props} from "@ngrx/store";
import {Item} from "../models/item";
import {CurrencyEnumType} from "../models/currency-enum-type";
import {ProductsResponseData} from '../models/product-response-data'

export enum ActionTypes {
  Add = '[Item Items] Add item',
  Archive = '[Item Active] Archive item',
  Reactivate = '[Item Archive] Reactivate item',
  UpdateExchangeRate = '[Item Currency] Update exchange rate',
  FetchExchangeRate = '[Item Currency] Fetch exchange rate',
  FetchExchangeRateError = '[Item Currency] Fetch exchange rate error',
  UpdateCurrencyType = '[Item Currency] Update currency type',
  FetchProducts = '[Item] Fetch products',
  FetchProductsSuccess = '[Item] Fetch products success',
  FetchProductsError = '[Item] Fetch products error',
}

export const add = createAction(
  ActionTypes.Add,
  props<{ payload: Item }>()
);

export const archive = createAction(
  ActionTypes.Archive,
  props<{ payload: Item }>()
);

export const reactive = createAction(
  ActionTypes.Reactivate,
  props<{ payload: Item }>()
);

export const updateExchangeRate = createAction(
  ActionTypes.UpdateExchangeRate,
  props<{ payload: number }>()
);

export const fetchExchangeRate = createAction(
  ActionTypes.FetchExchangeRate
);

export const fetchExchangeError = createAction(
  ActionTypes.FetchExchangeRateError,
  props<{ message: string }>()
);

export const updateCurrencyType = createAction(
  ActionTypes.UpdateCurrencyType,
  props<{ payload: CurrencyEnumType }>()
);

export const fetchProducts = createAction(
  ActionTypes.FetchProducts
);

export const fetchProductsSuccess = createAction(
  ActionTypes.FetchProductsSuccess,
  props<{ payload: ProductsResponseData[] }>()
);

export const fetchProductsError = createAction(
  ActionTypes.FetchProductsError,
  props<{ message: string }>()
);

