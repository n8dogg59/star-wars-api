import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { People } from './people';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Starships } from './starships';
import { Planets } from './planets';


@Injectable({
  providedIn: 'root'
})
export class apiCallService {

  private url = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<People[]> {
    console.log("Getting all people.")
    return this.http.get<People[]>(this.url + "people").pipe(
      tap(data => console.log('All people ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  
  getPerson(id: string): Observable<People> {
    console.log("Getting Person")
    console.log(this.url + `people/${id}`)
    return this.http.get<People>(this.url + `people/${id}`)
  }

  getAllStarships(): Observable<Starships[]> {
    console.log("Getting all starships.")
    return this.http.get<Starships[]>(this.url + "starships").pipe(
      tap(data => console.log('All starships ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getAllPlanets(): Observable<Planets[]> {
    console.log("Getting all planets.")
    return this.http.get<Planets[]>(this.url + "planets").pipe(
      tap(data => console.log('All planets ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getPlanet(id: string): Observable<Planets> {
    console.log("Getting Planet")
    console.log(this.url + `planets/${id}`)
    return this.http.get<Planets>(this.url + `planets/${id}`)
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;      
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}


