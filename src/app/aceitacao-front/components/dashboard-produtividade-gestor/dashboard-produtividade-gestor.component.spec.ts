import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProdutividadeGestorComponent } from './dashboard-produtividade-gestor.component';

describe('DashboardProdutividadeGestorComponent', () => {
  let component: DashboardProdutividadeGestorComponent;
  let fixture: ComponentFixture<DashboardProdutividadeGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProdutividadeGestorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProdutividadeGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
