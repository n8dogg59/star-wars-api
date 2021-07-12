import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleColumnDChartComponent } from './people-column-d-chart.component';

describe('PeopleColumnDChartComponent', () => {
  let component: PeopleColumnDChartComponent;
  let fixture: ComponentFixture<PeopleColumnDChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleColumnDChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleColumnDChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
