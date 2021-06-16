import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { PersonDetailComponent } from './people/person-detail.component';
import { HomeComponent } from './home/home.component';
import { StarshipsComponent } from './starships/starships.component';
import { PlanetsComponent } from './planets/planets.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PersonDetailComponent,
    HomeComponent,
    StarshipsComponent,
    PlanetsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
