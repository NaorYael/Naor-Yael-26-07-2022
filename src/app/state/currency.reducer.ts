import {createReducer, on} from "@ngrx/store";
import {updateCurrencyType, updateExchangeRate} from "./items.actions";
import {CurrencyEnumType} from "../models/currency-enum-type";

export const initialState: Readonly<State> = {exchangeRate: 3.5, selectedCurrency: CurrencyEnumType.ILS};

export const currencyReducer = createReducer(initialState,
    on(updateExchangeRate, (state, {payload}) => {
        return {...state, exchangeRate: payload}
    }),
    on(updateCurrencyType, (state, {payload}) => {
        return {...state, selectedCurrency: payload}
    })
);

export interface State {
    exchangeRate: number;
    selectedCurrency: CurrencyEnumType;
}
