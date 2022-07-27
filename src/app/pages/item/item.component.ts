import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Item} from "../../models/item";
import {Store} from "@ngrx/store";
import {selectActive, selectArchive} from "../../state/app.selectors";
import {LOCAL_STORAGE_TAB_INDEX_KEY} from '../store/store.component'


@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ItemComponent implements OnInit {

    public displayedColumns: string[] = ['name', 'store', 'priceUSD', 'estimatedDelivery', 'isArchived'];
    public items!: Item[];
    public archive$ = this.store.select(selectArchive);
    public active$ = this.store.select(selectActive);

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.validateActiveTabOnPageRefresh()
    }

    private validateActiveTabOnPageRefresh() {
        localStorage.setItem(LOCAL_STORAGE_TAB_INDEX_KEY, '0');
    }
}
