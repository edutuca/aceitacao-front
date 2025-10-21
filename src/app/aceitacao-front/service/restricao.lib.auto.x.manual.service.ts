import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RestricaoLiberacaoAutomaticoManual } from "../api/restricao.liberacao.automatico.manual";
import { map, Observable } from "rxjs";

@Injectable()
export class RestricaoLiberacaoAutomaticoXManualService {
    
        constructor(private http: HttpClient) { }
    
        getPropostaXPrazo():Observable<RestricaoLiberacaoAutomaticoManual[]> {
            return this.http.get<RestricaoLiberacaoAutomaticoManual[]>('assets/demo/data/restricoes-auto-manual.json').pipe(
                map((response: any) => {
                 return response.data; 
                })
            );
        }
    
}