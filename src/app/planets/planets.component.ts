import { Component, OnDestroy, OnInit } from '@angular/core';
import { Planets } from '../planets';
import { apiCallService } from '../apicall.service';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import HC_exporting from "highcharts/highcharts-more";
import colorAxis from "highcharts/modules/coloraxis";
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);
import cylinder from 'highcharts/modules/cylinder';
cylinder(Highcharts);
import funnel3d from 'highcharts/modules/funnel3d';
funnel3d(Highcharts);
import pyramid3d from 'highcharts/modules/pyramid3d';
pyramid3d(Highcharts);

colorAxis(Highcharts);

interface ExtendedPointOptionsObject extends Highcharts.PointOptionsObject {
  country: string;
}

Highcharts.setOptions({
  lang: {
    thousandsSep: ","
  }
});

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
    orbitalArray: any;
    rotationArray: any;
    diameterArrayMulti: any;
    chartOptions: any;
    bubbleArray: any;
    pyramidArray: any;
    sortedPlanetArraySW: any;
    popArray: any;
    sortedPlanetsArrayClimate: any;
    climateArray: any;
    sub!: Subscription;
    highcharts: typeof Highcharts = Highcharts;

    barChartOptions: Highcharts.Options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Diameter of Each Planet in Star Wars Universe'
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
        }
      },
      colorAxis: {
        maxColor: '#000fb0',
        minColor: '#e3e5ff',
      },      
      tooltip: {
        shared: true,
        valueSuffix: ' miles'
      },
      plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Population',
        colorKey: 'colorValue',
        type: 'bar',
        data: [{
          y: 107,
          colorValue: 107},
          {
            y: 31,
            colorValue: 31},
          {
            y: 635,
            colorValue: 635},
          {
            y: 203,
            colorValue: 203},
          {
            y: 2,
            colorValue: 2},
          {
            y: 224,
            colorValue: 224}
      ]
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
          "<tr><th>Planet Diameter:</th><td>{point.x} km</td></tr>" +
          "<tr><th>Orbital Period:</th><td>{point.y} days</td></tr>" +
          "<tr><th>Population:</th><td>{point.z} people</td></tr>",
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

    multipleAxisChartOptions: Highcharts.Options = {
      chart : {
        zoomType: 'x'
      },
      title : {
        text: 'Orbital Period, Rotation Period, Diameter by Planet'   
      },   
      subtitle : {
        text: 'Source: <a href="https://swapi.dev/">swapi.dev</a>'
      },
      credits: {
      enabled: false
      },
      xAxis : {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      },
      yAxis : [
        { // Primary yAxis
           labels: {
              format: '{value}\xB0C',
              style: {
                 color: '#0000FF'
              }
           },
           title: {
              text: 'Orbital Period',
              style: {
                 color: '#0000FF'
              }
           },
           opposite: true
        }, 
        { // Secondary yAxis
           title: {
              text: 'Rotation Period',
              style: {
                 color: '#A52A2A'
              }
           },
           labels: {
              format: '{value} mm',
              style: {
                 color: '#A52A2A'
              }
           }
        },
        { // Tertiary yAxis
           gridLineWidth: 0,
           title: {
              text: 'Diameter',
              style: {
                 color: '#2F4F4F'
              }
           },
           labels: {
              format: '{value} mb',
              style: {
                 color: '#2F4F4F'
              }
           },
           opposite:true  
        }
     ],
     tooltip: {
        shared: true
     },
     legend: {
        enabled:false
     },
     series : [
        {
           name: 'Rotation Period',
           type: 'column',
           yAxis: 1,
           data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5,
                   216.4, 194.1, 95.6, 54.4],
           tooltip: {
              valueSuffix: ' mm'
           },
           color: '#A52A2A'
        }, 
        {
           name: 'Orbital Period',
           type: 'spline',
           yAxis: 2,
           data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2,
                    1013.1, 1016.9, 1018.2, 1016.7],
           marker: {
              enabled: false
           },
           dashStyle: 'ShortDot',
           tooltip: {
              valueSuffix: ' mb'
           }
        },
        {
           name: 'Diameter',
           type: 'spline',
           data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
           tooltip: {
              valueSuffix: '\xB0C'
           }
        }
     ]
    }
    
    pyramidDChartOptions: Highcharts.Options = {
      chart: {
        type: 'pyramid3d',
        options3d: {
            enabled: true,
            alpha: 5,
            depth: 55,
            viewDistance: 50
        }
      },
      title: {
        text: 'Surface Water Breakdown'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f}%)',
                allowOverlap: true,
                x: 10,
                y: 5
            }
        }
      },
      series: [{
        name: 'Unique Users',
        type: 'pyramid3d',
        data: [
            ['Website visits', 15654],
            ['Downloads', 4064],
            ['Requested price list', 1987],
            ['Invoice sent', 976],
            ['Finalized', 846]
        ]
      }]
    }

    cylinderChartOptions: Highcharts.Options = {
      chart: {
        type: 'cylinder',
        margin: 75,
        marginLeft: 100,
        options3d: {
           enabled: true,
           alpha: 8,
           beta: 8,
           depth: 50,
           viewDistance: 25
        }
      },         
      title : {
          text: "Planet's Population"   
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        title: {
            text: null
        }
      },
      yAxis : { 
        labels: {
          format: '{value:,.0f}',
          style: {
            color: '#000000'
          },
          
        },
        title: {
          text: null
        }
      }, 
      plotOptions : {
        cylinder: {
          depth: 25,
          colorByPoint: true
        }
      },
      series : [{
          type: 'cylinder',
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                  194.1, 95.6, 54.4]
      }]
    }

    pieSemiChartOptions: Highcharts.Options = {
      chart : {
        plotBorderWidth: 0,
        plotShadow: false
      },
      title : {
          text: 'Climate Breakdown by Planet',
      },
      credits: {
        enabled: false
      },
      tooltip : {
        shared: true,
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
            valueSuffix: '%'
        }
      },
      plotOptions : {
        pie: {
          dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '100%'
              }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
      }
      },
      series : [{
          type: 'pie',
          name: 'Browser share',
          innerSize: '50%',
          data: [
            ['Chrome', 58.9],
            ['Firefox', 13.29],
            ['Internet Explorer', 13],
            ['Edge', 3.78],
            ['Safari', 3.42],
            {
                name: 'Other',
                y: 7.61,
                dataLabels: {
                    enabled: false
                }
            }
          ]
      }]
    }

    constructor(private apiCallService: apiCallService) { }
  
    ngOnInit(): void {
      this.sub = this.apiCallService.getAllPlanets().subscribe(
        (data: Planets[]) => {
            this.nameArray = [];
            this.diameterArray = [];
            this.rotationArray = [];
            this.orbitalArray = [];
            this.bubbleArray = [];
            this.diameterArrayMulti = [];
            this.pyramidArray = [];
            this.popArray = [];
            this.climateArray = [];
            this.allPlanets = data;
            this.stringJson = JSON.stringify(this.allPlanets);  
            this.stringObject = JSON.parse(this.stringJson);
            this.planetsArray = this.stringObject.results;
            this.sortedPlanetArraySW = this.planetsArray;
            this.sortedPlanetsArrayClimate = this.planetsArray;
            console.log(this.sortedPlanetsArrayClimate);
            this.sortedPlanetArraySW = this.sortedPlanetArraySW.sort(this.compareSW);
            console.log(this.sortedPlanetArraySW)
            this.sortedPlanetsArrayClimate = this.sortedPlanetsArrayClimate.sort(this.compareClimate);
            this.climateArray = this.calculateClimate(this.sortedPlanetsArrayClimate);
            console.log(this.climateArray);
            console.log('Climate sorted array ', this.sortedPlanetsArrayClimate);
            console.log('sorted arrary ', this.sortedPlanetArraySW);
            console.log('All done getting planets. ', this.planetsArray)
            for (let i = 0; i < this.planetsArray.length; i++) {
              let planet = this.planetsArray[i].name;
              let orbital = parseInt(this.planetsArray[i].orbital_period);
              let rotation = parseInt(this.planetsArray[i].rotation_period);
              let population = parseInt(this.planetsArray[i].population);
              let diameter = parseInt(this.planetsArray[i].diameter);
              if (diameter > 20000) {
                diameter = 20000
              }
              if (population > 10000000000) {
                population = population / 100
              }
              this.nameArray.push(this.planetsArray[i].name);
              this.diameterArray.push({y: diameter, colorValue: diameter});
              this.orbitalArray.push(orbital);
              this.rotationArray.push(rotation);
              this.diameterArrayMulti.push(diameter);
              this.bubbleArray.push({x: diameter, y: orbital, z: population, country: planet});
              this.popArray.push(population);
            }

            for (let i = 0; i < this.sortedPlanetArraySW.length; i++) {
              let sortedSurfaceWater = parseInt(this.sortedPlanetArraySW[i].surface_water);
              if (Number.isFinite(sortedSurfaceWater)) {
                this.pyramidArray.push([this.sortedPlanetArraySW[i].name, sortedSurfaceWater]);
              }
              console.log(this.pyramidArray);
            }
            
            this.updateOptions(this.nameArray, this.diameterArray, this.bubbleArray, this.diameterArrayMulti, this.orbitalArray, this.rotationArray, this.pyramidArray, this.popArray, this.climateArray);
            HC_exporting(Highcharts);

        },
          (err: any) => console.log(err)
      )
    }

    updateOptions(names: any, diameter: any, bubble: any, diameterMulti: any, orbital: any, rotation: any, pyramid: any, population: any, climate: any) {
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
      ];
      this.bubbleChartOptions.series = [
        {
          type: "bubble",
          data: bubble
        }
      ];

      this.multipleAxisChartOptions.xAxis = [
        {
          categories: names,
          crosshair: true
        }
      ]
      this.multipleAxisChartOptions.series = [
        {
          name: 'Rotation Period',
          type: 'column',
          yAxis: 1,
          data: rotation,
          tooltip: {
             valueSuffix: ' days'
          },
          color: '#A52A2A'

       }, 
       {
          name: 'Orbital Period',
          type: 'spline',
          yAxis: 2,
          data: orbital,
          marker: {
             enabled: false
          },
          dashStyle: 'ShortDot',
          tooltip: {
             valueSuffix: ' days'
          },
          color: '#0000FF'
       },
       {
          name: 'Diameter',
          type: 'spline',
          data: diameterMulti,
          tooltip: {
             valueSuffix: ' km'
          },
          color: '#2F4F4F'
       }
      ]

      this.pyramidDChartOptions.series = [{
        name: 'Surface Water',
        type: 'pyramid3d',
        data: pyramid,
        tooltip: {
          valueSuffix: '%'
       }
      }]

      this.cylinderChartOptions.series = [{
          type: 'cylinder',
          name: 'Population',
          data: population
      }]

      this.cylinderChartOptions.xAxis = [{
        categories: names,
        title: {
            text: null
        }
      }]

      this.pieSemiChartOptions.series = [{
        type: 'pie',
          name: 'Climate',
          innerSize: '50%',
          data: climate
      }]

      this.dataAvailable = true;
      this.chartOptions = [
        { chartConfig: this.barChartOptions},
        { chartConfig: this.bubbleChartOptions},
        { chartConfig: this.multipleAxisChartOptions },
        { chartConfig: this.pyramidDChartOptions},
        { chartConfig: this.cylinderChartOptions},
        { chartConfig: this.pieSemiChartOptions}
      ]
    }    

    compareSW(a: any, b: any) {
      let comparison = 0;
      if (parseInt(a.surface_water) > parseInt(b.surface_water)) {
        comparison = -1
      } else if (parseInt(a.surface_water) < parseInt(b.surface_water)) {
        comparison = 1;
      }
      return comparison;
    }

    compareClimate(a: any, b: any) {
      let comparison = 0;
      var climateA = a.climate.toUpperCase();
      var climateB = b.climate.toUpperCase();
      if (climateA < climateB) {
        comparison = -1
      } else if (climateA > climateB) {
        comparison = 1;
      }
      return comparison;
    }
    
    calculateClimate(climateArr: any) {
      let climateArray = [];  
      let total = 0;
      let inst = 0;

      
      for (let i = 0; i < climateArr.length; i++) {
        let name = climateArr[i].name;
        let climate = climateArr[i].climate;
        climateArray.push({name, climate, total})
      }
      console.log(climateArray);
      var finalClimate = [], prev;
      
      for ( var i = 0; i < climateArray.length; i++ ) {
        if ( climateArray[i].climate !== prev ) {
            finalClimate.push([climateArray[i].climate, climateArray[i].total]);
            console.log(finalClimate[inst][1]);
            let total = finalClimate[inst][1]
            total += 1;
            console.log(total)
            finalClimate[inst][1] = total;
            console.log(finalClimate[inst][1]);
            inst += 1;
        } else {
            console.log(finalClimate[i-1]);
            total = finalClimate[inst-1][1];
            total+= 1;
            finalClimate[inst-1][1] = total;
            console.log(finalClimate[inst-1])
        }
        prev = climateArray[i].climate;
        console.log(prev);
      }
      console.log(finalClimate);
      return finalClimate;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}