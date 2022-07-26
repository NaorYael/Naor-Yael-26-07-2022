import {Item} from "../models/item";

export interface AppState {
  items: ReadonlyArray<Item>;
  archive: ReadonlyArray<Item>;
  active: ReadonlyArray<Item>;
  currency: Readonly<number>;
}
