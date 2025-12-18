import { Component } from '@angular/core';
import { MenuItem, SelectItem, SelectItemGroup } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DetalheRestricao } from '../../api/detalhe.restricao';
import { DetalheStatusGrade } from '../../api/detalhe.status.grade';
import { Emissor } from '../../api/emissor';
import { PropostaXPrazo } from '../../api/proposta.x.prazo';
import { Restricao } from '../../api/restricao';
import { StatusGrade } from '../../api/status.grade';
import { EmissorService } from '../../service/emissor.service';
import { PropostaStatusService } from '../../service/proposta.status.service';
import { PropostaXPrazoService } from '../../service/proposta.x.prazo.service';
import { RestricoesService } from '../../service/restricao.service';

@Component({
  selector: 'app-dashboard-grade-gestor',
  templateUrl: './dashboard-grade-gestor.component.html'
})
export class DashboardGradeGestorComponent {
    periodoInicio!:Date;
    periodoFim!:Date;

    items!: MenuItem[];

    restricoes!: Restricao[];

    propostaXPrazos!: PropostaXPrazo[];

    statusGrade!: StatusGrade[];

    detalhePropostaGrade!: DetalheStatusGrade[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    restricaoDetalhe!: DetalheRestricao[];

    restricao!:Restricao;

    visibleDetalheRestricao!: boolean;

    visibleDetalheStatusGrade!: boolean;

    emissores!: Emissor[];
    
    emissoresSelecionados!: Emissor[];

    grupoEmissor:SelectItemGroup[] = [];

    constructor(
        private restricaoService: RestricoesService, 
        private emissorService:EmissorService,
        private propostaXPrazoService: PropostaXPrazoService, 
        private propostaStatusService:PropostaStatusService   
    ) {

    }

    ngOnInit() {

        this.initComboEmissores();
        this.initChart();
        
        this.restricaoService.getRestricoes().subscribe(data => { 
            this.restricoes = data;
        });

        this.propostaXPrazoService.getPropostaXPrazo().subscribe(data=>{
            this.propostaXPrazos = data;
        })

        this.propostaStatusService.getStatusGrade().subscribe(data=>{
            this.statusGrade = data;
        })

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.chartData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            datasets: [
                {
                    type: 'bar',
                    label: '2024',
                    backgroundColor: '#c94c4c',
                    data: [2, 8, 11, 1, 2, 3, 5],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: '2025',
                    backgroundColor: '#87CEFA',
                    data: [5, 6, 9, 10, 11, 10, 1]
                }
            ]
        };
        
        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    detalheRestricao(restricao:any) {
        this.visibleDetalheRestricao = false;
        this.restricao = restricao;

        this.restricaoService.getDetalheRestricao(restricao).subscribe(data => { 
            this.restricaoDetalhe = data;
            this.visibleDetalheRestricao = true;
        });        
    }

    detalheStatusGrade(status: string) {
        this.visibleDetalheStatusGrade = false;
        this.propostaStatusService.getDetalhePropostaStatus(status).subscribe(data=>{
            this.detalhePropostaGrade = data;
            this.visibleDetalheStatusGrade = true;
        });
    }

    executaFiltro() {
        console.log("Filtro executado!");
    }

    private initComboEmissores() {

        this.emissorService.getEmissores().subscribe(data=>{
            
        let descricaoGrupo:string = '';
        let grupo:SelectItemGroup = {
            label: '',
            items: []
        }

        data.forEach(data=>{

            let descricaoFormataGrupo = data.familia + ' - Grupo ' + data.idGrupo;

            let emissor:SelectItem = {
                label: data.matricula + ' - ' + data.nome,
                value: data
            };

            if(descricaoGrupo != descricaoFormataGrupo) {

                grupo = {
                    label: descricaoFormataGrupo,
                    value: {},
                    items: [emissor]
                };

                grupo.items = [];
                grupo.items.push(emissor);

                this.grupoEmissor.push(grupo);

                descricaoGrupo = descricaoFormataGrupo;
            } else {
                grupo.items.push(emissor);
            }
        });
        
       });
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
