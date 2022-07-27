import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductsResponseData} from '../models/product-response-data'

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private url = `https://fakestoreapi.com/products`

    constructor(private http: HttpClient) {
    }

    getProducts(): Observable<ProductsResponseData[]> {
        return this.http.get<ProductsResponseData[]>(this.url);
    }
}

