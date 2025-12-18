import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { UIChart } from 'primeng/chart';
import { Familia } from '../../api/familia';
import { EmissorService } from '../../service/emissor.service';
import { FamiliaService } from '../../service/familia.service';
import { RestricaoLiberacaoAutomaticoXManualService } from '../../service/restricao.lib.auto.x.manual.service';

@Component({
  selector: 'app-dashboard-produtividade',
  templateUrl: './dashboard-produtividade-emissor.component.html',
  styleUrls: ['./dashboard-produtividade-emissor.component.scss']
})
export class DashboardProdutividadeEmissorComponent implements OnInit{
    dataCompareDe!: Date;
    dataCompareCom!: Date;

    chartData: any;
    chartOptions: any;

    chartDataPorProduto:any;  
    chartOptionsPorProduto:any;

    chartDataManualAutoPorProduto:any;
    chartOptionsManualAutoPorProduto:any;

    chartDataManualAutoPorRestricao:any;
    chartOptionsManualAutoPorRestricao:any;

    chartDataProdutividade:any;
    chartOptionsProdutividade:any;

    chartDataQtdRecusaPorMotivo:any;
    chartOptionsQtdRecusaPorMotivo:any;

    periodoInicio!:Date;
    periodoFim!:Date;

    familias!:Familia[];

    familiaSelecionada!:Familia;

    familiaDescricao!:string[];

    grupoEmissor:SelectItemGroup[] = [];

    @ViewChild('chartMediaAtendimentoIndividual') chartMediaAtendimentoIndividual!: UIChart;
    @ViewChild('chartManualAutomaticoPorRestricao') chartManualAutomaticoPorRestricao!: UIChart;
    @ViewChild('chartRecusadaLiberadaNoAno') chartRecusadaLiberadaNoAno!: UIChart;
    
    
    constructor(
        private emissorService:EmissorService, 
        private familiaService:FamiliaService, 
        private restricaoLiberacaoAutomaticoXManualService:RestricaoLiberacaoAutomaticoXManualService){
    }

    ngOnInit() {
        this.familiaService.getFamilias().subscribe(data=>{
          this.familias = data;
          this.familiaDescricao = [];
          data.forEach(fam=>{
            this.familiaDescricao.push(fam.descricao);
          })

          this.initChartMediaAtendimentoIndividual();
          this.initChartStacked();
          this.initChartManualAutoPorProduto();
          this.initChartProdutividadeComparacaoAno();
          this.initChartManualAutoPorRestricao();
          this.initChartQuantidadeDeRecusaPorMotivo();
        });
        
     
    }

    initChartStacked() {
       const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartDataPorProduto = {
            labels: this.familiaDescricao,
            datasets: [
                {
                    type: 'bar',
                    label: 'Tempo Medio Liberado (dias)',
                    backgroundColor: '#3CB371',
                    data: [2, 5, 1, 5,8,12,14,15,2,4,6,7,8,2,3,4,5,7,3,5]
                },
                {
                    type: 'bar',
                    label: 'Tempo Medio Recusa (dias)',
                    backgroundColor: '#c94c4c',
                    data: [10, 12, 1, 5,8,2,12,1,12,4,3,7,4,12,13,2,1,7,3,5]
                }
            ]
        };

        this.chartOptionsPorProduto = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    initChartMediaAtendimentoIndividual() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
        this.chartData = {
            labels: ['Janeiro/2025'],
            datasets: [
                {
                    label: 'AGRO-SAFRA - Felipe Gasparino Rubia  - Qtd Proposta(s): 6 - Media',
                    backgroundColor: '#c94c4c',
                    data: [2],
                    tipo:'Recusado',
                    hidden: true
                },
                {
                    label: 'AGRO-SAFRA - Felipe Gasparino Rubia - Qtd Proposta(s): 340 - Media',
                    backgroundColor: '#87CEFA',
                    tipo:'Liberado',
                    data: [4]
                }         
            ],
            secudaryDataSet:[
            {
                backgroundColor: '#87CEFA',
                label: 'Liberado'
            },
            {
                backgroundColor: '#c94c4c',
                label: 'Recusado'
            }
            ]
        };

        this.chartOptions = { 
            maintainAspectRatio: false,
            aspectRatio: 0.9,
            plugins: {
                legend: {
                    display: false,
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

   initChartManualAutoPorProduto() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.chartDataManualAutoPorProduto = {
            labels: this.familiaDescricao,
            datasets: [
                {
                    type: 'bar',
                    label: 'Manual',
                    backgroundColor: '#e2e29cff',
                    data: [20,20,20,15,80,10,10,20,15,20,20,20,20,20,20,20,20,20,20,13]
                },
                {
                    type: 'bar',
                    label: 'Automático',
                    backgroundColor: '#348631ff',
                    data: [80,80,80,85,20,90,90,80,85,80,80,80,80,80,80,80,80,80,80,87]
                }
            ]
        };
        
        this.chartOptionsManualAutoPorProduto = {
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

   initChartManualAutoPorRestricao() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartDataManualAutoPorRestricao = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            datasets: [
                {
                    type: 'bar',
                    label: 'PAN / AUTO',
                    backgroundColor: '#e2e29cff',
                    restricao: 'PAN',
                    data: [80,10,20,60,40,90,50,20,10,4,1,100]
                },
                {
                    type: 'bar',
                    label: 'PAN / AUTO',
                    restricao: 'PAN',
                    backgroundColor: '#348631ff ',
                    data: [20,90,80,40,60,10,50,80,90,96,99,0]
                },
                {
                    type: 'bar',
                    label: 'VIS / AUTO',
                    restricao: 'VIS',
                    backgroundColor: '#e2e29cff',
                    data: [80,10,20,60,40,90,50,20,10,4,1,100]
                },
                {
                    type: 'bar',
                    label: 'VIS / AUTO',
                    restricao: 'VIS',
                    backgroundColor: '#348631ff ',
                    data: [20,90,80,40,60,10,50,80,90,96,99,0]
                },
                {
                    type: 'bar',
                    label: 'AJU / AUTO',
                    restricao: 'AJU',
                    backgroundColor: '#e2e29cff',
                    data: [80,10,20,60,40,90,50,20,10,4,1,100]
                },
                {
                    type: 'bar',
                    label: 'AJU / AUTO',
                    restricao: 'AJU',
                    backgroundColor: '#348631ff ',
                    data: [20,90,80,40,60,10,50,80,90,96,99,0]
                },
                {
                    type: 'bar',
                    label: 'BON / AUTO',
                    restricao: 'BON',
                    backgroundColor: '#e2e29cff',
                    data: [20,90,80,40,60,10,50,80,90,96,99,0]
                },
                {
                    type: 'bar',
                    label: 'BON / AUTO',
                    restricao: 'BON',
                    backgroundColor: '#348631ff ',
                    data: [80,10,20,60,40,90,50,20,10,4,1,100]
                },
                {
                    type: 'bar',
                    label: 'CRI / AUTO',
                    restricao: 'CRI',
                    backgroundColor: '#e2e29cff',
                    data: [20,90,80,40,60,10,50,80,90,96,99,0]
                },
                {
                    type: 'bar',
                    label: 'CRI / AUTO',
                    restricao: 'CRI',
                    backgroundColor: '#348631ff ',
                    data: [80,10,20,60,40,90,50,20,10,4,1,100]
                },
                {
                    type: 'bar',
                    label: 'REE / AUTO',
                    restricao: 'REE',
                    backgroundColor: '#e2e29cff',
                    data: [20,90,80,40,60,10,50,80,90,96,99,0]
                },
                {
                    type: 'bar',
                    label: 'REE / AUTO',
                    restricao: 'REE',
                    backgroundColor: '#348631ff ',
                    data: [80,10,20,60,40,90,50,20,10,4,1,100]
                },
                {
                    type: 'bar',
                    label: 'DIV / AUTO',
                    restricao: 'DIV',
                    backgroundColor: '#e2e29cff',
                    data: [20,90,80,40,60,10,50,80,90,96,99,0]
                },
                {
                    type: 'bar',
                    label: 'DIV / AUTO',
                    restricao: 'DIV',
                    backgroundColor: '#348631ff ',
                    data: [80,10,20,60,40,90,50,20,10,4,1,100]
                },
                {
                    type: 'bar',
                    label: 'IMP / AUTO',
                    restricao: 'IMP',
                    backgroundColor: '#e2e29cff',
                    data: [20,90,80,40,60,10,50,80,90,96,99,0]
                },
                {
                    type: 'bar',
                    label: 'IMP / AUTO',
                    restricao: 'IMP',
                    backgroundColor: '#348631ff',
                    data: [80,10,20,60,40,90,50,20,10,4,1,100]
                }
            ],
            secudaryDataSet:[{
                backgroundColor: '#fafcfdff',
                label: 'PAN'
            },
            {
                backgroundColor: '#fafcfdff',
                label: 'VIS'
            },
            {
                backgroundColor: '#fafcfdff',
                label: 'AJU'
            },
            {
                backgroundColor: '#fafcfdff',
                label: 'BON'
            },
            {
                backgroundColor: '#fafcfdff',
                label: 'CRI'
            },
            {
                backgroundColor: '#fafcfdff',
                label: 'REE'
            },
            {
                backgroundColor: '#fafcfdff',
                label: 'DIV'
            },
            {
                backgroundColor: '#fafcfdff',
                label: 'IMP'
            }
            ],
            legendDataSet:[{
                backgroundColor: '#e2e29cff',
                label: 'Manual'
            },
            {
                backgroundColor: '#348631ff',
                label: 'Automático'
            }
            ]
        };

        this.chartOptionsManualAutoPorRestricao = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };        
    }     

    initChartProdutividadeComparacaoAno() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.chartDataProdutividade = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            datasets: [
                {
                    type: 'bar',
                    label: 'AUTO Recusados / 2024',
                    backgroundColor: '#c94c4c',
                    tipo: 'Recusado',
                    data: [2200,1020,3890,2303,4500,6087,1000,2000,8092,1090,1200,3000]
                },
                {
                    type: 'bar',
                    label: 'AUTO Liberados / 2024',
                    backgroundColor: '#87CEFA',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'AUTO Recusados / 2025',
                    backgroundColor: '#c94c4c',
                    tipo: 'Recusado',
                    data: [2200,1020,3890,2303,4500,6087,1000,2000,8092,1090,1200,3000]
                },
                {
                    type: 'bar',
                    label: 'AUTO Liberados / 2025',
                    backgroundColor: '#87CEFA',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                }                
            ],
            secudaryDataSet:[{
                backgroundColor: '#c94c4c',
                label: 'Recusado'
            },
            {
                backgroundColor: '#87CEFA',
                label: 'Liberado'
            }
            ]
        };
        
        this.chartOptionsProdutividade = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false,
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

    initChartQuantidadeDeRecusaPorMotivo() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.chartDataQtdRecusaPorMotivo = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            datasets: [
                {
                    type: 'bar',
                    label: 'ASSINATURA DIGITAL NÃO CONCLUÍDA',
                    backgroundColor: '#0d0d0eff',
                    tipo: 'Liberado',
                    data: [550,600,200,250,805,988,547,2000,2444,1300,855]
                },
                {
                    type: 'bar',
                    label: 'VISTORIA PRÉVIA NÃO REALIZADA',
                    backgroundColor: '#0e3650ff',
                    tipo: 'Liberado',
                    data: [980,880,2000,400,255,666,500,456,800,19,432,400]
                },
                {
                    type: 'bar',
                    label: 'PROPOSTA RECUSADA A PEDIDO DO CORRETOR/SEGURADO',
                    backgroundColor: '#a7991cff',
                    tipo: 'Liberado',
                    data: [598,688,39,90,122,299,390,345,80,199,430,400]
                },   
                {
                    type: 'bar',
                    label: 'ASSINATURA DIGITAL NÃO CONCLUÍDA',
                    backgroundColor: '#0d0d0eff',
                    tipo: 'Liberado',
                    data: [580,680,399,900,102,29,30,560,800,199,420,400]
                },
                {
                    type: 'bar',
                    label: 'DADOS DO CARTÃO DE CRÉDITO NÃO ENVIADO PELO SEGURADO',
                    backgroundColor: '#0bb5e9ff',
                    tipo: 'Liberado',
                    data: [598,680,399,900,122,999,300,35,80,19,20,40]
                }
              /*  {
                    type: 'bar',
                    label: 'RECUSA POR REGULAMENTO INTERNO EMPRESA',
                    backgroundColor: '#c94c4c',
                    tipo: 'Recusado',
                    data: [2200,1020,3890,2303,4500,6087,1000,2000,8092,1090,1200,3000]
                },
                {
                    type: 'bar',
                    label: 'RECUSA POR FALTA DE RETORNO À COBRANÇA DE PENDÊNCIA',
                    backgroundColor: '#87CEFA',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'DEVOLUÇÃO DEVIDO CORRETOR ESTAR COM CADASTRO SUSPENSO',
                    backgroundColor: '#3fbe8aff',
                    tipo: 'Recusado',
                    data: [2200,1020,3890,2303,4500,6087,1000,2000,8092,1090,1200,3000]
                },
                {
                    type: 'bar',
                    label: 'VISTORIA PRÉVIA NÃO APROVADA',
                    backgroundColor: '#153a2eff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'VISTORIA PRÉVIA NÃO REALIZADA',
                    backgroundColor: '#0e3650ff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'PROPOSTA RECUSADA A PEDIDO DO CORRETOR/SEGURADO',
                    backgroundColor: '#a7991cff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'BONUS DIVERGENTE',
                    backgroundColor: '#6f7703ff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'VISTORIA PREVIA DIGITAL NÃO REALIZADA',
                    backgroundColor: '#cc6d2eff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'VISTORIA PRÉVIA DIGITAL NÃO FINALIZADA - AUSÊNCIA FOTOS COMPLEMENTARES',
                    backgroundColor: '#a35ab9ff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'DUPLICIDADE DE PROPOSTA',
                    backgroundColor: '#3f4549ff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'ASSINATURA DIGITAL NÃO CONCLUÍDA',
                    backgroundColor: '#0d0d0eff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'VISTORIA PRÉVIA SEM AGENDAMENTO',
                    backgroundColor: '#422d2eff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'DADOS DO CARTÃO DE CRÉDITO NÃO ENVIADO PELO SEGURADO',
                    backgroundColor: '#0bb5e9ff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                },
                {
                    type: 'bar',
                    label: 'VISTORIA PRÉVIA NÃO CONCLUÍDA - FOTOS NÃO ENVIADAS E/OU INCORRETAS',
                    backgroundColor: '#a73ceeff',
                    tipo: 'Liberado',
                    data: [5980,6880,3999,9000,1022,2999,3900,34560,8000,1999,4320,4900]
                }*/
            ]
        };
        
        this.chartOptionsQtdRecusaPorMotivo = {            
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false,
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


   toggleDatasetVisibilityIndividual(index: number, inicioDescricaoId:string) {
        this.toggleDatasetVisibility(this.chartMediaAtendimentoIndividual, index, inicioDescricaoId,'tipo');
   }

   toggleDatasetManualAutomaticoPorRestricao(index: number, inicioDescricaoId:string) {
        this.toggleDatasetVisibility(this.chartManualAutomaticoPorRestricao, index, inicioDescricaoId,'restricao');
   }
   
   toggleDatasetPropostaRecLibNoAno(index: number, inicioDescricaoId:string) {
        this.toggleDatasetVisibility(this.chartRecusadaLiberadaNoAno, index, inicioDescricaoId,'tipo');
   }   

   private toggleDatasetVisibility(chart: UIChart, index: number, inicioDescricaoId:string, descricaoAtributoComparacao:string) {
        const secudaryLegend = chart.data.secudaryDataSet[index];

        for (let i = 0; i < chart.data.datasets.length; i++) {
            let metaData = chart.chart.getDatasetMeta(i);
            let legendPrincipal = chart.data.datasets[i];

            if(secudaryLegend.label == legendPrincipal[descricaoAtributoComparacao]) {
                metaData.hidden = metaData.hidden === null ? !legendPrincipal.hidden : null;
            }
        }
        
        let el:any = document.getElementById(inicioDescricaoId+index);
        
        if(el.style.textDecoration) {
            el.style = '';
        } else {
            el.style = 'text-decoration: line-through';
        }

        chart.chart.data.datasets[index];
        chart.chart.update();
   }
}
