import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardProdutividadeGestorComponent } from './dashboard-produtividade-gestor.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardProdutividadeGestorComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardProdutividadeGestorRoutingModule { }