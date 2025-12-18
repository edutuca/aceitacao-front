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
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { DashboardGradeGestorRoutingModule } from './dashboard-grade-gestor-routing.module';
import { DashboardGradeGestorComponent } from './dashboard-grade-gestor.component';



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
        DashboardGradeGestorRoutingModule,
        MessagesModule,
        DividerModule,
        DialogModule,
        CalendarModule,
        MultiSelectModule
    ],
    declarations: [DashboardGradeGestorComponent]
})
export class DashboardGradeGestorModule { }
