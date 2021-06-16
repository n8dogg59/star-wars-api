import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from './people';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class apiCallService {

  url = 'https://swapi.co/api/people/';

  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<People[]> {
    console.log("Getting all people.")
    return this.http.get<People[]>('https://swapi.dev/api/people/');
  }
  
  // public nextPage: string = "";
  // public getPeople(url?: string){
  //   return this.httpClient.get<People[]>(`https://swapi.dev/api/people/`);
}


