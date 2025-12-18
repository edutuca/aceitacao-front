import { transition } from '@angular/animations';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    tipoBusca: any[] = [];
    tipoBuscaSelecionado: any;

    situacaoProposta: any[] = [];

    codigoCorretor!: number;

    constructor(public layoutService: LayoutService) { }

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

         this.loadComboFiltroAvancado();
         this.loadComboSituacaoProposta();
    }

    private loadComboFiltroAvancado() {
        this.tipoBusca = [
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
