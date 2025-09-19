import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { map, Observable } from 'rxjs';
import { Restricao } from '../api/restricao';
import { DetalheRestricao } from '../api/detalhe.restricao';

@Injectable()
export class RestricoesService {

    constructor(private http: HttpClient) { }

    getRestricoes():Observable<Restricao[]> {
        return this.http.get<Restricao[]>('assets/demo/data/restricoes.json').pipe(
            map((response: any) => {
             return response.data; 
            })
        );
    }

    getDetalheRestricao(restricao:Restricao):Observable<DetalheRestricao[]> {
        return this.http.get<Restricao[]>('assets/demo/data/detalhe-restricao.json').pipe(
             map(restr => restr.find(restr => restr.tipo === restricao.tipo)),
             map((response: any) =>{
                return response;
             })
        ); 
    }

}
