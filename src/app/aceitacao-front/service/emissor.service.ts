import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DetalheStatusGrade } from '../api/detalhe.status.grade';
import { StatusGrade } from '../api/status.grade';
import { Emissor } from '../api/emissor';

@Injectable()
export class EmissorService {

    constructor(private http: HttpClient){ }
    
    getGrupoEmissores():Observable<Emissor[]>  {
        return this.http.get<Emissor[]>('assets/demo/data/grupos-emissores.json').pipe(
             map((response:any) => {               
                return response.data;
             })
        ); 
    }   

    getEmissores():Observable<Emissor[]>  {
        return this.http.get<Emissor[]>('assets/demo/data/emissores.json').pipe(
             map((response:any) => {               
                return response.data;
             })
        ); 
    } 
}
