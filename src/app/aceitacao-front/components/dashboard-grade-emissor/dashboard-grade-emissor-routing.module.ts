import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardGradeEmissorComponent } from './dashboard-grade-emissor.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardGradeEmissorComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardGradeEmissorRoutingModule { }
