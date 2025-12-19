import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { UIChart } from 'primeng/chart';
import { Familia } from '../../api/familia';
import { EmissorService } from '../../service/emissor.service';
import { FamiliaService } from '../../service/familia.service';
import { RestricaoLiberacaoAutomaticoXManualService } from '../../service/restricao.lib.auto.x.manual.service';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

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
    
    grupoDistribuicao:any[] = [];
    grupoDistribuicaoSelecionado:any;

    constructor(
        private emissorService:EmissorService, 
        private familiaService:FamiliaService, 
        private restricaoLiberacaoAutomaticoXManualService:RestricaoLiberacaoAutomaticoXManualService){
    }

    ngOnInit() {
        this.initComboGruipoDistribuicao();
        
        this.familiaService.getFamilias().subscribe(data=>{
          this.familias = data;
          this.familiaDescricao = [];
          data.forEach(fam=>{
            this.familiaDescricao.push(fam.descricao);
          })

          this.initChartMediaAtendimentoIndividual();
          this.initChartStacked();
          this.initChartManualAutoPorProduto();
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
                annotation: {
                    annotations: {
                    linhaLiberado: {
                        type: 'line',
                        scaleID: 'y',
                        value: 5,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        borderDash: [5, 5],
                        label: {
                            display: true,
                            content: 'Média: 5', 
                            position: 'end',
                            backgroundColor: '#87CEFA',
                            color: '#FFFFFF',
                            font: {
                            size: 12,
                            weight: 'bold'
                            }
                        }                     
                    },
                    linhaRecusado: {
                    display: false,
                    type: 'line',
                    scaleID: 'y',
                    value: 2,
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    borderWidth: 2,
                    borderDash: [6, 6],
                    label: {
                        display: true,
                        content: 'Média: 2',
                        backgroundColor: '#c94c4c',
                        position: 'end',
                            color: '#FFFFFF',
                            font: {
                            size: 12,
                            weight: 'bold'
                        }
                     }
                   },
                   linhaTotal: {
                    display: true,
                    type: 'line',
                    scaleID: 'y',
                    value: 8,
                    borderColor: '#008080',
                    borderWidth: 2,
                    borderDash: [6, 6],
                    label: {
                        display: true,
                        content: 'Média Total: 8',
                        backgroundColor: '#008080',
                        position: 'end',
                            color: '#FFFFFF',
                            font: {
                            size: 12,
                            weight: 'bold'
                        }
                     }
                   } 
                }                  
            },
             legend: {
                    display: false,
                    labels: {
                        color: textColor                           
                    },                                        
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
                    beginAtZero: true,
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

        if(secudaryLegend.label == 'Recusado') {
            chart.chart.options.plugins.annotation.annotations.linhaRecusado.display=(chart.chart.options.plugins.annotation.annotations.linhaRecusado.display)?!chart.chart.options.plugins.annotation.annotations.linhaRecusado.display:true; 
        }

        if(secudaryLegend.label == 'Liberado') {
            chart.chart.options.plugins.annotation.annotations.linhaLiberado.display=(chart.chart.options.plugins.annotation.annotations.linhaLiberado.display)?!chart.chart.options.plugins.annotation.annotations.linhaLiberado.display:true; 
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

    private initComboGruipoDistribuicao() {
        this.emissorService.getGrupoEmissores().subscribe(data=>{
             data.forEach(data=>{
                this.grupoDistribuicao.push({
                    descricao: data.familia + ' - Grupo ' + data.idGrupo
                });
            });
        });
    }
}
