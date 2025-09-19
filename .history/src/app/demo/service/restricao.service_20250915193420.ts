import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable()
export class RestricoesService {

    constructor(private http: HttpClient) { }

    getRestricoes() {
        return this.http.get<any>('assets/demo/data/restricoes.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

}
