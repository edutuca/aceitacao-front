import { transition } from '@angular/animations';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { AssessoriaService } from '../aceitacao-front/service/assessoria.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    tipoBusca: any[] = [];
    tipoBuscaSelecionado: any;
    situacaoPropostaSelecionado: any;

    situacaoProposta: any[] = [];

    codigoCorretor!: number;

    cpfCnpjSegurado!:number;

    assessorias:any[] = [];
    assessoriaSelecionada!:any;

    constructor(
        private assessoriaService:AssessoriaService,
        private layoutService: LayoutService,
        private router:Router
    ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Grade',
                items: [
                    { label: 'Dash - Emissor', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard-grade-emissor'] },
                    { label: 'Dash - Gestor', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard-grade-gestor'] },
                ]
            },
            {
                label: 'Produtividade',
                items: [
                    { label: 'Dash - Emissor', icon: 'pi pi-chart-line', routerLink: ['/dashboard-produtividade-emissor'] },
                    { label: 'Dash - Gestor', icon: 'pi pi-chart-line', routerLink: ['/dashboard-produtividade-gestor'] }
                ]
            }        

         ];

         this.assessoriaService.getAssessorias().subscribe(assessorias=>{
            this.assessorias = assessorias;
          }
         );

         this.loadComboFiltroAvancado();
         this.loadComboSituacaoProposta();
    }

    pesquisaProposta() {
        this.router.navigateByUrl('/pesquisa-propostas');
    }

    private loadComboFiltroAvancado() {
        this.tipoBusca = [
            {descricao:"Selecione Tipo de Busca"},
            {descricao:"Sucursal"},
            {descricao:"Corretor"},
            {descricao:"Assessoria"},
            {descricao:"Segurado"}
        ];
                	
    }

    private loadComboSituacaoProposta() {
        this.situacaoProposta = [
            {
                status:"GRD",
                descricao: "GRADE"
            },
            {
                status:"REC",
                descricao: "RECUSADO"
            },
            {
                status:"LIB",
                descricao: "LIBERADO"
            }
        ]
    }
}
