import { Component, OnDestroy, OnInit } from "@angular/core";
import { People } from "../people";
import { apiCallService } from "../apicall.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'sw-people',
    templateUrl: './people.component.html'
  })

export class PeopleComponent implements OnInit, OnDestroy{
    
    allPeople: People[] | undefined;
    stringJson: any;
    stringObject: any;
    peopleArray: any;
    sub!: Subscription;
    
    constructor(private apiCallService: apiCallService) { }
  
    ngOnInit(): void {
      this.sub = this.apiCallService.getAllPeople().subscribe(
        (data: People[]) => {
            this.allPeople = data;
            this.stringJson = JSON.stringify(this.allPeople);  
            this.stringObject = JSON.parse(this.stringJson);
            this.peopleArray = this.stringObject.results;
            console.log('All done getting people. ', this.peopleArray)

        },
          (err: any) => console.log(err)
      )
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

