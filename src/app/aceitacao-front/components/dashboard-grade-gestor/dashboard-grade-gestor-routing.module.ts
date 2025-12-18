import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardGradeGestorComponent } from './dashboard-grade-gestor.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardGradeGestorComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardGradeGestorRoutingModule { }
