import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { DashboardProdutividadeEmissorRoutingModule } from './dashboard-produtividade-emissor-routing.module';
import { DashboardProdutividadeEmissorComponent } from './dashboard-produtividade-emissor.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardProdutividadeEmissorRoutingModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        MessagesModule,
        DividerModule,
        DialogModule,
        MultiSelectModule,
        CalendarModule,
        DropdownModule
    ],
    declarations: [DashboardProdutividadeEmissorComponent]
})
export class DashboardProdutividadeEmissorModule { }
