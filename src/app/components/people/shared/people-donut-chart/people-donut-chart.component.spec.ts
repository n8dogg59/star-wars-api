import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDonutChartComponent } from './people-donut-chart.component';

describe('PeopleDonutChartComponent', () => {
  let component: PeopleDonutChartComponent;
  let fixture: ComponentFixture<PeopleDonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleDonutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
