import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUseractionsareaComponent } from './report-useractionsarea.component';

describe('ReportUseractionsareaComponent', () => {
  let component: ReportUseractionsareaComponent;
  let fixture: ComponentFixture<ReportUseractionsareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportUseractionsareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportUseractionsareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
