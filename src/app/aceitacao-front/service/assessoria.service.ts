import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable()
export class AssessoriaService {

    constructor(private http: HttpClient){ }
    
    getAssessorias():Observable<any[]>  {
        return this.http.get<any[]>('assets/demo/data/assessorias.json').pipe(
             map((response:any) => {               
                return response.data;
             })
        ); 
    }   

}
