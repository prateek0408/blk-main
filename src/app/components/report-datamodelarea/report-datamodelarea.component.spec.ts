import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDatamodelareaComponent } from './report-datamodelarea.component';

describe('ReportDatamodelareaComponent', () => {
  let component: ReportDatamodelareaComponent;
  let fixture: ComponentFixture<ReportDatamodelareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDatamodelareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDatamodelareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
