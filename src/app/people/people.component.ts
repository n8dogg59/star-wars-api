import { Component, OnDestroy, OnInit } from "@angular/core";
import { People } from "../people";
import { apiCallService } from "../apicall.service";
import { Subscription } from "rxjs";
import * as Highcharts from 'highcharts';


@Component({
    selector: 'sw-people',
    templateUrl: './people.component.html'
  })

export class PeopleComponent implements OnInit, OnDestroy{
    dataAvailable = false;
    allPeople: People[] | undefined;
    stringJson: any;
    stringObject: any;
    peopleArray: any;
    dataArray: any;
    sub!: Subscription;
    updateFlag = false;
    highcharts: typeof Highcharts = Highcharts;

    chartOptions: Highcharts.Options = {
      chart: {
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in January, 2018'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: 'pie',
        data: [{
            name: 'Chrome',
            y: 61.41
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
      }]
      
    }

    
    constructor(private apiCallService: apiCallService) { }
  
    ngOnInit(): void {
      let totalHeight = 0;
      this.sub = this.apiCallService.getAllPeople().subscribe(
        (data: People[]) => {
            this.dataArray = [];
            this.allPeople = data;
            this.stringJson = JSON.stringify(this.allPeople);  
            this.stringObject = JSON.parse(this.stringJson);
            this.peopleArray = this.stringObject.results;
            console.log('All done getting people. ', this.peopleArray)
            console.log('length of array is ', this.peopleArray.length);
            for (let i = 0; i < this.peopleArray.length; i++) {
              let peopleHeight = parseInt(this.peopleArray[i].height);
              totalHeight += peopleHeight;              
            }
            for (let i = 0; i < this.peopleArray.length; i++) {
              let personHeight = parseInt(this.peopleArray[i].height);
              let personName = this.peopleArray[i].name;
              this.dataArray.push({name: personName, y: personHeight});
              this.updateOptions(this.dataArray);
            }        
        },
          (err: any) => console.log(err)
      )
    }

    updateOptions(dataArray: any) {
      console.log(dataArray);
      this.chartOptions.series = [
        {
          name: 'Heights',
          colorByPoint: true,
          type: 'pie',
          data: dataArray
        }
      ]
      this.dataAvailable = true;
      console.log(this.dataAvailable);
    }    

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

