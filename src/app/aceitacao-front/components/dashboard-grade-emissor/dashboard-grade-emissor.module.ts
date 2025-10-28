import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { DashboardGradeEmissorRoutingModule } from './dashboard-grade-emissor-routing.module';
import { DashboardGradeEmissorComponent } from './dashboard-grade-emissor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardGradeEmissorRoutingModule,
        MessagesModule,
        DividerModule,
        DialogModule,
        CalendarModule
    ],
    declarations: [DashboardGradeEmissorComponent]
})
export class DashboardGradeEmissorModule { }
