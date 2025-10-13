import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardProdutividadeComponent } from './dashboard-produtividade.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardProdutividadeComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardProdutividadeRoutingModule { }