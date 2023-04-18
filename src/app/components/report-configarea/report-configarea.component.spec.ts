import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfigareaComponent } from './report-configarea.component';

describe('ReportConfigareaComponent', () => {
  let component: ReportConfigareaComponent;
  let fixture: ComponentFixture<ReportConfigareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportConfigareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportConfigareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
