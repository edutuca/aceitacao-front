import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardProdutividadeGestorRoutingModule } from './dashboard-produtividade-gestor-routing.module';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DashboardProdutividadeGestorComponent } from './dashboard-produtividade-gestor.component';



@NgModule({
  declarations: [DashboardProdutividadeGestorComponent],
  imports: [
    CommonModule,
    DashboardProdutividadeGestorRoutingModule,
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
   ]  
})
export class DashboardProdutividadeGestorModule { }
