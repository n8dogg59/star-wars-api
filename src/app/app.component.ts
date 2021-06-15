import { Component, OnInit } from '@angular/core';
import { People } from './people';
import { apiCallService } from './apicall.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'starWarsAPI';
  allPeople: People[] | undefined;
  constructor(private apiCallService: apiCallService) { }

  ngOnInit(): void {
    this.apiCallService.getAllPeople().subscribe(
      (data: People[]) => this.allPeople = data,
        (err: any) => console.log(err),
        () => console.log('All done getting people. ' + JSON.stringify(this.allPeople))
    )
  }

  //   getPeopleList(){
//     this.apiCallService.getAllPeople().subscribe((res)=>{ this.apiCallService.getAllPeople(this.apiService.nextPage).subscribe((data:Employee[]) => {
//         console.log(data);
//         });
//     });
// }
}


