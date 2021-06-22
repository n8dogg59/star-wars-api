import { Component, OnDestroy, OnInit } from '@angular/core';
import { Planets } from '../planets';
import { apiCallService } from '../apicall.service';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';

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
    popArray: any;
    sub!: Subscription;
    highcharts: typeof Highcharts = Highcharts;

    chartOptions: Highcharts.Options = {
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
            console.log(this.dataAvailable);
            this.updateOptions(this.nameArray, this.popArray);
            // this.updatePop(this.popArray);
        },
          (err: any) => console.log(err)
      )
    }

    updateOptions(names: any, pop: any) {
      console.log(names);
      this.chartOptions.xAxis = [
        {
          categories: names
        }
      ];
      console.log(pop);
      this.dataAvailable = true;
      console.log(this.dataAvailable);
    }

    // updatePop(pop: any) {
    //   console.log(pop);
    //   this.chartOptions.series = [
    //     {
    //       data: pop
    //     }
    //   ]
    // }
    

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}
