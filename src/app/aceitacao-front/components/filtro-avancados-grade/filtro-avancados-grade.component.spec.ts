import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAvancadosGradeComponent } from './filtro-avancados-grade.component';

describe('FiltroAvancadosGradeComponent', () => {
  let component: FiltroAvancadosGradeComponent;
  let fixture: ComponentFixture<FiltroAvancadosGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroAvancadosGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroAvancadosGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
