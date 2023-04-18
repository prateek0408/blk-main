import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportChartareaComponent } from './report-chartarea.component';

describe('ReportChartareaComponent', () => {
  let component: ReportChartareaComponent;
  let fixture: ComponentFixture<ReportChartareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportChartareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportChartareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
