import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Item} from "../models/item";
import {State} from "./currency.reducer";
import {ProductState} from './products.reducer'


export const selectItems = createFeatureSelector<ReadonlyArray<Item>>('items');
export const selectCurrency = createFeatureSelector<Readonly<State>>('currency');
export const selectProductState = createFeatureSelector<Readonly<ProductState>>('products');

export const selectActive = createSelector(selectItems, (state) => {
    return state.filter(item => !item.isArchived)
});

export const selectArchive = createSelector(selectItems, (state) => {
    return state.filter(item => item.isArchived)
});

export const selectExchangeRate = createSelector(selectCurrency, (state) => {
    return state.exchangeRate;
});

export const selectCurrencyType = createSelector(selectCurrency, (state) => {
    return state.selectedCurrency;
});

export const selectProducts = createSelector(selectProductState, (state) => {
    return state.products;
});

export const selectByStore = createSelector(selectItems, (state): Array<StoreData> => {
    const sumArr: Array<StoreData> = [];
    state.forEach(item => {
        const index = sumArr.findIndex(sumArrItem => sumArrItem.name == item.store)
        if (index == -1) {
            sumArr.push({
                name: item.store,
                quantity: 1,
                sum: item.priceUSD,
            })
        } else {
            sumArr[index].sum += item.priceUSD;
            sumArr[index].quantity += 1;
        }
    });
    return sumArr;
});

export interface StoreData {
    quantity: number;
    sum: number;
    name: string;
}
