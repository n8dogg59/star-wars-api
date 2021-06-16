import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { People } from './people';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class apiCallService {

  private url = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<People[]> {
    console.log("Getting all people.")
    return this.http.get<People[]>(this.url).pipe(
      tap(data => console.log('All people ', JSON.stringify(data))),
      catchError(this.handleError)
    )
    ;
  }
  
  getPerson(id: string): Observable<People> {
    console.log("Getting Person")
    return this.http.get<People>(this.url + `${id}`)
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


