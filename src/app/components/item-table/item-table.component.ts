import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {AddItemComponent} from "../add-item/add-item.component";
import {Item} from "../../models/item";
import {Store} from "@ngrx/store";
import {CurrencyEnumType} from "../../models/currency-enum-type";
import {Observable} from "rxjs";
import {selectCurrencyType, selectExchangeRate} from "../../state/app.selectors";
import {archive, reactive} from "../../state/app.actions";

@Component({
    selector: 'app-item-table',
    templateUrl: './item-table.component.html',
    styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {

    public displayedColumnsNames!: string[];
    public selectedCurrency$: Observable<CurrencyEnumType>;
    public exchangeRate$: Observable<number>;
    public usd = CurrencyEnumType.USD;
    public dataSource!: MatTableDataSource<Item>;

    constructor(private dialog: MatDialog,
                private store: Store) {
    }

    @Input()
    public set inputData(data: ReadonlyArray<Item>) {
        this.dataSource = new MatTableDataSource([...data]);
    }

    @Input()
    public displayedColumns!: string[];

    @Input()
    public title!: string;

    @Input()
    public isAddButton!: boolean;

    @Input()
    public addButtonText!: string;

    @Output()
    public addClick = new EventEmitter();

    @Output()
    public clickRow = new EventEmitter();

    public ngOnInit(): void {
        this.displayedColumnsNames = this.displayedColumns.map((column) => {
            return column;
        });

        this.selectedCurrency$ = this.store.select(selectCurrencyType);
        this.exchangeRate$ = this.store.select(selectExchangeRate);
    }


    public onAddClick($event: MouseEvent): void {
        this.addClick.emit($event);

        this.dialog.open(AddItemComponent, {
            width: '640px', disableClose: true
        });
    }

    public onRowClick(row: any): void {
        this.clickRow.emit(row);
    }

    public handleArchiveMode(payload: Item) {
        this.store.dispatch(payload.isArchived ? reactive({payload}) : archive({payload}));
    }
}
