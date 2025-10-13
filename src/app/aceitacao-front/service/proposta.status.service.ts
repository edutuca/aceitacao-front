import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DetalheStatusGrade } from '../api/detalhe.status.grade';
import { StatusGrade } from '../api/status.grade';

@Injectable()
export class PropostaStatusService {

    constructor(private http: HttpClient){ }
    
    getStatusGrade():Observable<StatusGrade[]>  {
        return this.http.get<StatusGrade[]>('assets/demo/data/proposta-status-grade.json').pipe(
             map((response:any) => {               
                return response.data;
             })
        ); 
    }

    getDetalhePropostaStatus(status:string):Observable<DetalheStatusGrade[]> {
        return this.http.get<DetalheStatusGrade[]>('assets/demo/data/detalhe-propostaxprazo.json').pipe(
             map((response:any) => {               
                return response.data;
             })
        ); 
    }

}
