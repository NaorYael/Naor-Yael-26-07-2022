import {Item} from "../models/item";
import {createReducer, on} from "@ngrx/store";
import {add, archive, reactive} from "./items.actions";

export const initialState: ReadonlyArray<Item> = [];

export const itemsReducer = createReducer(initialState,
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
