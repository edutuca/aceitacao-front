import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { RedirecService } from '../../service/redirect.service';

@Component({
  selector: 'app-filtro-avancados-grade',
  templateUrl: './filtro-avancados-grade.component.html',
  styleUrls: ['./filtro-avancados-grade.component.scss']
})
export class FiltroAvancadosGradeComponent implements OnInit{
  iframeSrc:SafeResourceUrl | undefined;
 
  constructor(private redirecService:RedirecService,  private sanitizer:DomSanitizer){
 
  }

  ngOnInit() {
    this.loadPage();
  }
  loadPage() {
    this.redirecService.redirect().subscribe(url=>{
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }
}
