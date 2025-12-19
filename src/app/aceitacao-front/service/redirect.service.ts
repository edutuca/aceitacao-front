import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { map, Observable } from "rxjs";

@Injectable()
export class RedirecService {

    constructor(private http: HttpClient, private sanitizer:DomSanitizer) { }

    public redirect():Observable<string> {
    
    let headers:HttpHeaders = new HttpHeaders();
    headers.set('LOGIN','E108184');

    return this.http.get('http://localhost:8086/ems/act/Aceitacao', {
      headers: headers,
      responseType: 'blob'
    }).pipe(map(blob=>{
      const objectUrl = URL.createObjectURL(blob);
      return objectUrl;
    }
    ));
    }
}