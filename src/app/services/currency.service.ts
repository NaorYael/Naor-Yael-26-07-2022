import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CurrencyResponseData} from '../models/currency-response-data';
import {environment} from '../../environments/environment'
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {

    private key = environment.currency_api;
    private currencyUSD = 'USD';
    private currencyILS = 'ILS';
    private exchangeAmount = '1';
    private date = new Date();
    private formattedDate = moment(this.date).format("YYYY-MM-DD");
    private url =
      `https://exchange-rates.abstractapi.com/v1/convert?api_key=
      ${this.key}&base=${this.currencyUSD}&target=${this.currencyILS}
      &date=${this.formattedDate}&base_amount=${this.exchangeAmount}`

    constructor(private http: HttpClient) {
    }

    getExchangeRate(): Observable<CurrencyResponseData> {
      return this.http.get<CurrencyResponseData>(this.url);
    }
}
