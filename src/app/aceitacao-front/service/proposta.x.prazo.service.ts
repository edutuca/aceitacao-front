import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PropostaXPrazo } from '../api/proposta.x.prazo';

@Injectable()
export class PropostaXPrazoService {

    constructor(private http: HttpClient) { }

    getPropostaXPrazo():Observable<PropostaXPrazo[]> {
        return this.http.get<PropostaXPrazo[]>('assets/demo/data/propostaxprazo.json').pipe(
            map((response: any) => {
             return response.data; 
            })
        );
    }

}
