import { Component, OnInit } from '@angular/core';
import { Emissor } from '../../api/emissor';
import { EmissorService } from '../../service/emissor.service';
import { Familia } from '../../api/familia';
import { FamiliaService } from '../../service/familia.service';

@Component({
  selector: 'app-dashboard-produtividade',
  templateUrl: './dashboard-produtividade.component.html',
  styleUrls: ['./dashboard-produtividade.component.scss']
})
export class DashboardProdutividadeComponent implements OnInit{
    dataCompareDe!: Date;
    dataCompareCom!: Date;

    chartData: any;
    chartOptions: any;

    chartDataPorProduto:any;  
    chartOptionsPorProduto:any;

    chartDataManualAuto:any;
    chartOptionsManualAuto:any;

    chartDataProdutividade:any;
    chartOptionsProdutividade:any;
    
    emissores!: Emissor[];

    emissoresSelecionados!: Emissor[];

    periodoInicio!:Date;
    periodoFim!:Date;

    familias!:Familia[];

    familiaSelecionada!:Familia;

    familiaDescricao!:string[];


    constructor(private emissorService:EmissorService, private familiaService:FamiliaService){
    }

    ngOnInit() {
        this.emissorService.getEmissores().subscribe(data=>{
          this.emissores = data;
        });

        this.familiaService.getFamilias().subscribe(data=>{
          this.familias = data;
          this.familiaDescricao = [];
          data.forEach(fam=>{
            this.familiaDescricao.push(fam.descricao);
          })

          this.initChartBar();
          this.initChartStacked();
          this.initChartManualAuto();
          this.initChartProdutividadeComparacaoAno();
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

    initChartBar() {
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

   initChartManualAuto() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.chartDataManualAuto = {
            labels: this.familiaDescricao,
            datasets: [
                {
                    type: 'bar',
                    label: 'Manual',
                    backgroundColor: '#c94c4c',
                    data: [20,20,20,15,80,10,10,20,15,20,20,20,20,20,20,20,20,20,20,13],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Automático',
                    backgroundColor: '#87CEFA',
                    data: [80,80,80,85,20,90,90,80,85,80,80,80,80,80,80,80,80,80,80,87]
                }
            ]
        };
        
        this.chartOptionsManualAuto = {
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

    
     initChartProdutividadeComparacaoAno() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.chartDataProdutividade = {
            labels: ['2024','2025'],
            datasets: [
                {
                    type: 'bar',
                    label: 'AUTO Recusados',
                    backgroundColor: '#c94c4c',
                    data: [220,120],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'AUTO Liberados',
                    backgroundColor: '#87CEFA',
                    data: [598,688]
                }
            ]
        };
        
        this.chartOptionsProdutividade = {
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
}
