import {Component, OnInit} from '@angular/core';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CurrencyEnumType} from "./models/currency-enum-type";
import {selectCurrencyType} from "./state/app.selectors";
import {fetchExchangeRate, updateCurrencyType} from "./state/app.actions";
import {MatSelectChange} from '@angular/material/select'
import {LOCAL_STORAGE_TAB_INDEX_KEY} from './pages/store/store.component'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {

    public selectedCurrency$ = this.store.select(selectCurrencyType);

    public currencyOptions = ['USD', 'ILS']
    public selectedValue: string;
    public selectedIndex: number;

    constructor(private router: Router, private store: Store) {
    }

    ngOnInit(): void {
        // Call abstractapi every 10 sec, if the currency changed updated him according to the selected currency.
        setInterval(() => {
            this.store.dispatch(fetchExchangeRate())
        }, 10000)

        this.selectedValue = 'ILS';

        this.selectedIndex = this.getSelectedTabIndex();
    }

    onTabChanged(event: MatTabChangeEvent): void {
        switch (event.index) {
            case 0:
                this.router.navigate(['/item']);
                this.selectedIndex = 0;
                break;
            case 1:
                this.router.navigate(['/store']);
                break;
        }
    }

    public selectedCurrency(event: MatSelectChange) {
        this.onCurrencyChanged(event.value);
    }

    private onCurrencyChanged(selectedValue: CurrencyEnumType) {
        this.store.dispatch(updateCurrencyType(
            {
                payload: selectedValue === CurrencyEnumType.USD ?
                    CurrencyEnumType.USD
                    :
                    CurrencyEnumType.ILS
            }));
    }

    private getSelectedTabIndex() {
        return Number(localStorage.getItem(LOCAL_STORAGE_TAB_INDEX_KEY))
    }
}
