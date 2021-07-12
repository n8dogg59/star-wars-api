import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePieChartComponent } from './people-pie-chart.component';

describe('PeoplePieChartComponent', () => {
  let component: PeoplePieChartComponent;
  let fixture: ComponentFixture<PeoplePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeoplePieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
