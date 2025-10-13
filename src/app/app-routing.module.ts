import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './aceitacao-front/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./aceitacao-front/components/dashboard-grade/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'dashboard-produtividade', loadChildren: () => import('./aceitacao-front/components/dashboard-produtividade/dashboard-produtividade.module').then(m => m.DashboardProdutividadeModule) }
                    
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
