import { Component, OnDestroy, OnInit } from '@angular/core';
import { Planets } from '../planets';
import { apiCallService } from '../apicall.service';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'sw-planets',
  templateUrl: './planets.component.html'
})

export class PlanetsComponent implements OnInit , OnDestroy {

    allPlanets: Planets[] | undefined;
    stringJson: any;
    stringObject: any;
    planetsArray: any;
    nameArray: any;
    popArray: any;
    sub!: Subscription;
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
      // chart: {
      //   plotShadow: false,
      //   type: 'pie'
      // },
      // title: {
      //   text: 'Browser market shares in January, 2018'
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
      //       allowPointSelect: true,
      //       cursor: 'pointer',
      //       dataLabels: {
      //           enabled: true,
      //           format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      //       }
      //   }
      // },
      // series: [{
      //   name: 'Brands',
      //   colorByPoint: true,
      //   type: 'pie',
      //   data: [{
      //       name: 'Chrome',
      //       y: 61.41
      //   }, {
      //       name: 'Internet Explorer',
      //       y: 11.84
      //   }, {
      //       name: 'Firefox',
      //       y: 10.85
      //   }, {
      //       name: 'Edge',
      //       y: 4.67
      //   }, {
      //       name: 'Safari',
      //       y: 4.18
      //   }, {
      //       name: 'Sogou Explorer',
      //       y: 1.64
      //   }, {
      //       name: 'Opera',
      //       y: 1.6
      //   }, {
      //       name: 'QQ',
      //       y: 1.2
      //   }, {
      //       name: 'Other',
      //       y: 2.61
      //   }]
      // }]
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region'
      },
      subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
            text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Population',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Population',
        type: 'bar',
        data: [107, 31, 635, 203, 2]
      }]
    }
    
    constructor(private apiCallService: apiCallService) { }
  
    ngOnInit(): void {
      this.sub = this.apiCallService.getAllPlanets().subscribe(
        (data: Planets[]) => {
            this.nameArray = [];
            this.popArray = [];
            this.allPlanets = data;
            this.stringJson = JSON.stringify(this.allPlanets);  
            this.stringObject = JSON.parse(this.stringJson);
            this.planetsArray = this.stringObject.results;
            console.log('All done getting planets. ', this.planetsArray)
            console.log('length of array is ', this.planetsArray.length);
            for (let i = 0; i < this.planetsArray.length; i++) {
              this.nameArray.push(this.planetsArray[i].name);
              this.popArray.push(this.planetsArray[i].population)
            }
            console.log(this.nameArray);
            console.log(this.popArray);
        },
          (err: any) => console.log(err)
      )
    }
    

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}
