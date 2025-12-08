import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './aceitacao-front/components/notfound/notfound.component';
import { PropostaStatusService } from './aceitacao-front/service/proposta.status.service';
import { PropostaXPrazoService } from './aceitacao-front/service/proposta.x.prazo.service';
import { RestricoesService } from './aceitacao-front/service/restricao.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { EmissorService } from './aceitacao-front/service/emissor.service';
import { LayoutService } from './layout/service/app.layout.service';
import { MenuService } from './layout/app.menu.service';
import { FamiliaService } from './aceitacao-front/service/familia.service';
import { RestricaoLiberacaoAutomaticoXManualService } from './aceitacao-front/service/restricao.lib.auto.x.manual.service';
import { DashboardProdutividadeGestorComponent } from './aceitacao-front/components/dashboard-produtividade-gestor/dashboard-produtividade-gestor.component';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, DashboardProdutividadeGestorComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        RestricoesService, 
        PropostaXPrazoService, 
        PropostaStatusService, 
        EmissorService, 
        FamiliaService,
        RestricaoLiberacaoAutomaticoXManualService,
        LayoutService, 
        MenuService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
