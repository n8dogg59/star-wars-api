import { Component, OnDestroy, OnInit } from '@angular/core';
import { Starships } from '../starships';
import { apiCallService } from "../apicall.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'sw-starships',
  templateUrl: './starships.component.html'
})
export class StarshipsComponent implements OnInit, OnDestroy {

    allStarships: Starships[] | undefined;
    stringJson: any;
    stringObject: any;
    starshipsArray: any;
    sub!: Subscription;
    
    constructor(private apiCallService: apiCallService) { }
  
    ngOnInit(): void {
      this.sub = this.apiCallService.getAllStarships().subscribe(
        (data: Starships[]) => {
            this.allStarships = data;
            this.stringJson = JSON.stringify(this.allStarships);  
            console.log(this.stringJson);
            this.stringObject = JSON.parse(this.stringJson);
            this.starshipsArray = this.stringObject.results;
            console.log('All done getting people. ', this.starshipsArray)

        },
          (err: any) => console.log(err)
      )
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
