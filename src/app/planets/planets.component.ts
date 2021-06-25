import { Component, OnDestroy, OnInit } from '@angular/core';
import { Planets } from '../planets';
import { apiCallService } from '../apicall.service';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import HC_exporting from "highcharts/highcharts-more";
HC_exporting(Highcharts);

interface ExtendedPointOptionsObject extends Highcharts.PointOptionsObject {
  country: string;
}

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
    bubbleArray: any;
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

    bubbleChartOptions: Highcharts.Options = {
      chart: {
        type: "bubble",
        plotBorderWidth: 1,
        zoomType: "xy"
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: "Diameter and Orbital Period by Planet"
      },
      accessibility: {
        point: {
          valueDescriptionFormat:
            "{index}. {point.country}, diameter: {point.x}km, orbital: {point.y}days, population: {point.z}people."
        }
      },
      xAxis: {
        gridLineWidth: 1,
        title: {
          text: "Planet Diameter"
        },
        labels: {
          format: "{value} km"
        },
        accessibility: {
          rangeDescription: "Range: 7000 to 120000 kilometers."
        }
      },
  
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
          text: "Orbital Period"
        },
        labels: {
          format: "{value} days"
        },
        maxPadding: 0.2,
        accessibility: {
          rangeDescription: "Range: 300 to 5200 days."
        }
      },
  
      tooltip: {
        useHTML: true,
        headerFormat: "<table>",
        pointFormat:
          '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
          "<tr><th>Fat intake:</th><td>{point.x}g</td></tr>" +
          "<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>" +
          "<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>",
        footerFormat: "</table>",
        followPointer: true
      },
  
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.country}"
          },
          color: '#FA8072'
        }
      },
  
      series: [
        {
          type: "bubble",
          data: [
            {
              x: 95,
              y: 95,
              z: 13.8,
              country: "Belgium"
            } as ExtendedPointOptionsObject,
            { x: 86.5, y: 102.9, z: 14.7, country: "Germany" },
            { x: 80.8, y: 91.5, z: 15.8, country: "Finland" },
            { x: 80.4, y: 102.5, z: 12, country: "Netherlands" },
            { x: 80.3, y: 86.1, z: 11.8, country: "Sweden" },
            { x: 78.4, y: 70.1, z: 16.6, country: "Spain" },
            { x: 74.2, y: 68.5, z: 14.5, country: "France" },
            { x: 73.5, y: 83.1, z: 10, country: "Norway" },
            { x: 71, y: 93.2, z: 24.7, country: "United Kingdom" },
            { x: 69.2, y: 57.6, z: 10.4, country: "Italy" },
            { x: 68.6, y: 20, z: 16, country: "Russia" },
            { x: 65.5, y: 126.4, z: 35.3, country: "United States" },
            { x: 65.4, y: 50.8, z: 28.5, country: "Hungary" },
            { x: 63.4, y: 51.8, z: 15.4, country: "Portugal" },
            { x: 64, y: 82.9, z: 31.3, country: "New Zealand" }
          ]
        }
      ]
    };
    
    constructor(private apiCallService: apiCallService) { }
  
    ngOnInit(): void {
      this.sub = this.apiCallService.getAllPlanets().subscribe(
        (data: Planets[]) => {
            this.nameArray = [];
            this.diameterArray = [];
            this.bubbleArray = [];
            this.allPlanets = data;
            this.stringJson = JSON.stringify(this.allPlanets);  
            this.stringObject = JSON.parse(this.stringJson);
            this.planetsArray = this.stringObject.results;
            console.log('All done getting planets. ', this.planetsArray)
            console.log('length of array is ', this.planetsArray.length);
            for (let i = 0; i < this.planetsArray.length; i++) {
              let planet = this.planetsArray[i].name;
              let orbital = parseInt(this.planetsArray[i].orbital_period);
              let population = parseInt(this.planetsArray[i].population);
              let diameter = parseInt(this.planetsArray[i].diameter);
              if (diameter > 20000) {
                diameter = 20000
              }
              this.nameArray.push(this.planetsArray[i].name);
              this.diameterArray.push(diameter);
              this.bubbleArray.push({x: diameter, y: orbital, z: population, country: planet});
            }
            this.updateOptions(this.nameArray, this.diameterArray, this.bubbleArray);
        },
          (err: any) => console.log(err)
      )
    }

    updateOptions(names: any, diameter: any, bubble: any) {
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
      this.bubbleChartOptions.series = [
        {
          type: "bubble",
          data: bubble
        }
      ]
      console.log(diameter);
      this.dataAvailable = true;
      console.log(this.dataAvailable);
      this.chartOptions = [
        { chartConfig: this.barChartOptions},
        { chartConfig: this.bubbleChartOptions}
      ]
    }    

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}