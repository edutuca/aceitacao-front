import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './aceitacao-front/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard-grade-emissor', loadChildren: () => import('./aceitacao-front/components/dashboard-grade-emissor/dashboard-grade-emissor.module').then(m => m.DashboardGradeEmissorModule) },
                    { path: 'dashboard-grade-gestor', loadChildren: () => import('./aceitacao-front/components/dashboard-grade-gestor/dashboard-grade-gestor.module').then(m => m.DashboardGradeGestorModule) },
                    { path: 'dashboard-produtividade-emissor', loadChildren: () => import('./aceitacao-front/components/dashboard-produtividade-emissor/dashboard-produtividade-emissor.module').then(m => m.DashboardProdutividadeEmissorModule) },
                    { path: 'dashboard-produtividade-gestor', loadChildren: () => import('./aceitacao-front/components/dashboard-produtividade-gestor/dashboard-produtividade-gestor.module').then(m => m.DashboardProdutividadeGestorModule) },
                    { path: 'pesquisa-propostas', loadChildren: () => import('./aceitacao-front/components/filtro-avancados-grade/filtro-avancados-grade.module').then(m => m.FiltroAvancadosGradeModule) }  
                ]
            },
            { path: 'auth', loadChildren: () => import('./aceitacao-front/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./aceitacao-front/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
