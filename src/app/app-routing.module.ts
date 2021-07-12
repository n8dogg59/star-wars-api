import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonDetailComponent } from './components/people/person-detail.component';
import { PlanetDetailComponent } from './components/planets/planet-detail.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { StarshipsComponent } from './components/starships/starships.component';

const routes: Routes = [
  { path: 'people', component: PeopleComponent },
  { path: 'people/:id', component: PersonDetailComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'planets/:id', component: PlanetDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
