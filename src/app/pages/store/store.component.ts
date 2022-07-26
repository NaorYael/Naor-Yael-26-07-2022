import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {CurrencyEnumType} from "../../models/currency-enum-type";
import {Observable} from "rxjs";
import {selectByStore, selectCurrencyType} from "../../state/items.selectors";
import {Router} from '@angular/router'

export const LOCAL_STORAGE_TAB_INDEX_KEY = 'tabIndex';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

    public selectedCurrency$: Observable<CurrencyEnumType>;
    public items$ = this.store.select(selectByStore);
    public displayedColumns: string[] = ['store', 'quantity', 'sum'];

    @Output()
    private setTabIndex: EventEmitter<number> = new EventEmitter()
    private tabIndex: string

    constructor(private store: Store,
                private router: Router
    ) {
    }

    ngOnInit(): void {
        this.selectedCurrency$ = this.store.select(selectCurrencyType);
        this.setCurrentRoute();
    }


    private setCurrentRoute() {
        if (this.getCurrentRoute()) {
            this.tabIndex = '1';
            localStorage.setItem(LOCAL_STORAGE_TAB_INDEX_KEY, this.tabIndex);
        }
    }

    private getCurrentRoute(): boolean {
        return this.router.url === '/store';
    }
}
