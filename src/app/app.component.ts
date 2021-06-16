import { Component, OnInit } from '@angular/core';
import { People } from './people';
import { apiCallService } from './apicall.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'starWarsAPI';
  allPeople: People[] | undefined;
  stringJson: any;
  stringObject: any;
  peopleArray: any;
  constructor(private apiCallService: apiCallService) { }

  ngOnInit(): void {
    this.apiCallService.getAllPeople().subscribe(
      (data: People[]) => this.allPeople = data,
        (err: any) => console.log(err),
        () => { 
          this.stringJson = JSON.stringify(this.allPeople);
          console.log("String json object :", this.stringJson);
          console.log("Type :", typeof this.stringJson);
          console.log('All done getting people. ', this.allPeople)

          this.stringObject = JSON.parse(this.stringJson);
          this.peopleArray = this.stringObject.results;
          console.log(this.peopleArray);
          console.log("JSON object -", this.stringObject);
        }
    )
  }

  //   getPeopleList(){
//     this.apiCallService.getAllPeople().subscribe((res)=>{ this.apiCallService.getAllPeople(this.apiService.nextPage).subscribe((data:Employee[]) => {
//         console.log(data);
//         });
//     });
// }
}


