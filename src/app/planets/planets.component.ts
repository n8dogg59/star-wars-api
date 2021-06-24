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
    dataAvailable = false;
    allPlanets: Planets[] | undefined;
    stringJson: any;
    stringObject: any;
    planetsArray: any;
    nameArray: any;
    diameterArray: any;
    chartOptions: any;
    sub!: Subscription;
    highcharts: typeof Highcharts = Highcharts;

    barChartOptions: Highcharts.Options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Diameter of Each Planet in Star Wars Universe'
      },
      subtitle: {
        text: 'Source: <a href="https://swapi.dev/">swapi.dev</a>'
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
            text: 'Diameter'
        },
        labels: {
            overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' miles'
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

  //   bubbleChartOptions: Highcharts.Options = {
  //     chart: {
  //       type: 'bubble',
  //       plotBorderWidth: 1,
  //       zoomType: 'xy'
  //     },
  //     legend: {
  //       enabled: false
  //     },
  //     title: {
  //       text: 'Sugar and fat intake per country'
  //     },
  //     accessibility: {
  //       point: {
  //           valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
  //       }
  //     },
  //     xAxis: {
  //       gridLineWidth: 1,
  //       title: {
  //           text: 'Daily fat intake'
  //       },
  //       labels: {
  //           format: '{value} gr'
  //       },
  //       accessibility: {
  //           rangeDescription: 'Range: 60 to 100 grams.'
  //       }
  //   },

  //   yAxis: {
  //       startOnTick: false,
  //       endOnTick: false,
  //       title: {
  //           text: 'Daily sugar intake'
  //       },
  //       labels: {
  //           format: '{value} gr'
  //       },
  //       maxPadding: 0.2,
  //       accessibility: {
  //           rangeDescription: 'Range: 0 to 160 grams.'
  //       }
  //   },

  //   tooltip: {
  //       useHTML: true,
  //       headerFormat: '<table>',
  //       pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
  //           '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
  //           '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
  //           '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
  //       footerFormat: '</table>',
  //       followPointer: true
  //   },

  //   plotOptions: {
  //       series: {
  //           dataLabels: {
  //               enabled: true,
  //               format: '{point.name}'
  //           }
  //       }
  //   },

  //   series: [{
  //       data: [
  //           { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
  //           { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
  //           { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
  //           { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
  //           { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
  //           { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
  //           { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
  //           { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
  //           { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
  //           { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
  //           { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
  //           { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
  //           { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
  //           { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
  //           { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
  //       ] 
  //   }]

  // }

    
    constructor(private apiCallService: apiCallService) { }
  
    ngOnInit(): void {
      this.sub = this.apiCallService.getAllPlanets().subscribe(
        (data: Planets[]) => {
            this.nameArray = [];
            this.diameterArray = [];
            this.allPlanets = data;
            this.stringJson = JSON.stringify(this.allPlanets);  
            this.stringObject = JSON.parse(this.stringJson);
            this.planetsArray = this.stringObject.results;
            console.log('All done getting planets. ', this.planetsArray)
            console.log('length of array is ', this.planetsArray.length);
            for (let i = 0; i < this.planetsArray.length; i++) {
              let diameter = this.planetsArray[i].diameter;
              this.nameArray.push(this.planetsArray[i].name);
              this.diameterArray.push(parseInt(diameter));
            }
            this.updateOptions(this.nameArray, this.diameterArray);
        },
          (err: any) => console.log(err)
      )
    }

    updateOptions(names: any, diameter: any) {
      console.log(names);
      this.barChartOptions.xAxis = [
        {
          categories: names
        }
      ];
      this.barChartOptions.series = [
        {
          name: 'Diameter',
          type: 'bar',
          data: diameter
        }
      ]
      console.log(diameter);
      this.dataAvailable = true;
      console.log(this.dataAvailable);
      this.chartOptions = [
        { chartConfig: this.barChartOptions}
      ]
    }    

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}