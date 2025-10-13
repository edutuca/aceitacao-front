import { map, Observable } from "rxjs";
import { Familia } from "../api/familia";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class FamiliaService {

    constructor(private http: HttpClient){ }
    
    getFamilias():Observable<Familia[]>  {
        return this.http.get<Familia[]>('assets/demo/data/familia.json').pipe(
             map((response:any) => {               
                return response.data;
             })
        ); 
    }   

}
