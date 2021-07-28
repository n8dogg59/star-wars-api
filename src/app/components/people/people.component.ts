import { Component, OnDestroy, OnInit } from "@angular/core";
import { People } from "../../models/people";
import { apiCallService } from "../../apicall.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'sw-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss']
  })

export class PeopleComponent implements OnInit, OnDestroy {
    dataAvailable = false;
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
            // HC_exporting(Highcharts);
            this.dataAvailable = true;

        },
          (err: any) => console.log(err)
      )
    }
      // this.dataAvailable = true;
      // this.chartOptions = [
      //   { chartConfig: this.pieChartOptions },
      //   { chartConfig: this.lineColumnChartOptions },
      //   { chartConfig: this.pieDChartOptions},
      //   { chartConfig: this.columnDChartOptions},
      //   { chartConfig: this.donutChartOptions }
      // ]
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}