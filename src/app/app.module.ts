import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonDetailComponent } from './components/people/person-detail.component';
import { HomeComponent } from './components/home/home.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { PlanetDetailComponent } from './components/planets/planet-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule} from '@angular/material/card';
import { TestComponent } from './components/people/shared/test/test.component';
import { PeopleTableComponent } from './components/people/shared/people-table/people-table.component';
import { PeoplePieChartComponent } from './components/people/shared/people-pie-chart/people-pie-chart.component';
import { PeopleLineColumnChartComponent } from './components/people/shared/people-line-column-chart/people-line-column-chart.component';
import { PeopleThreeDPieChartComponent } from './components/people/shared/people-three-d-pie-chart/people-three-d-pie-chart.component';
import { PeopleDonutChartComponent } from './components/people/shared/people-donut-chart/people-donut-chart.component';
import { PeopleColumnDChartComponent } from './components/people/shared/people-column-d-chart/people-column-d-chart.component'

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PersonDetailComponent,
    HomeComponent,
    StarshipsComponent,
    PlanetsComponent,
    PlanetDetailComponent,
    TestComponent,
    PeopleTableComponent,
    PeoplePieChartComponent,
    PeopleLineColumnChartComponent,
    PeopleThreeDPieChartComponent,
    PeopleDonutChartComponent,
    PeopleColumnDChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HighchartsChartModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
