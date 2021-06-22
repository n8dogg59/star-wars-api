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
    
    allPeople: People[] | undefined;
    stringJson: any;
    stringObject: any;
    peopleArray: any;
    sub!: Subscription;
    updateFlag = false;
    highcharts: typeof Highcharts = Highcharts;

    chartOptions: Highcharts.Options = {
      // chart: {
      //   plotBorderWidth: 0,
      //   plotShadow: false
      // },
      // title: {
      //   text: 'Browser<br>shares<br>2017',
      //   align: 'center',
      //   verticalAlign: 'middle',
      //   y: 60
      // },
      // tooltip: {
      //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      // },
      // accessibility: {
      //   point: {
      //       valueSuffix: '%'
      //   }
      // },
      // plotOptions: {
      //   pie: {
      //       dataLabels: {
      //           enabled: true,
      //           distance: -50,
      //           style: {
      //               fontWeight: 'bold',
      //               color: 'white'
      //           }
      //       },
      //       startAngle: -90,
      //       endAngle: 90,
      //       center: ['50%', '75%'],
      //       size: '110%'
      //   }
      // },
      // series: [{
      //   type: 'pie',
      //   name: 'Browser share',
      //   innerSize: '50%',
      //   data: [
      //       ['Chrome', 58.9],
      //       ['Firefox', 13.29],
      //       ['Internet Explorer', 13],
      //       ['Edge', 3.78],
      //       ['Safari', 3.42],
      //       {
      //           name: 'Other',
      //           y: 7.61,
      //           dataLabels: {
      //               enabled: false
      //           }
      //       }
      //   ]
      // }]
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

