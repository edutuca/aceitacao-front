import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DetalheRestricao } from '../api/detalhe.restricao';
import { Restricao } from '../api/restricao';

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
        return this.http.get<DetalheRestricao[]>('assets/demo/data/detalhe-restricao.json').pipe(
             map(restr => {
                const obj = restr;
                console.log(obj['dddd']);
                return restr.filter(restr=>restricao.tipo);
             }),
             map((response: any) =>{
                return response;
             })
        ); 
    }

}
