import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FiltroAvancadosGradeComponent } from './filtro-avancados-grade.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FiltroAvancadosGradeComponent }
    ])],
    exports: [RouterModule]
})
export class FiltroAvancadosGradeRoutingModule { }