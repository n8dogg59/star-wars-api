import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLineColumnChartComponent } from './people-line-column-chart.component';

describe('PeopleLineColumnChartComponent', () => {
  let component: PeopleLineColumnChartComponent;
  let fixture: ComponentFixture<PeopleLineColumnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleLineColumnChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleLineColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
