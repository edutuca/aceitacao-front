import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardProdutividadeEmissorComponent } from './dashboard-produtividade-emissor.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardProdutividadeEmissorComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardProdutividadeEmissorRoutingModule { }