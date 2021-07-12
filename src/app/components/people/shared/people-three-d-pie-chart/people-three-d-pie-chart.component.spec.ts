import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleThreeDPieChartComponent } from './people-three-d-pie-chart.component';

describe('PeopleThreeDPieChartComponent', () => {
  let component: PeopleThreeDPieChartComponent;
  let fixture: ComponentFixture<PeopleThreeDPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleThreeDPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleThreeDPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
