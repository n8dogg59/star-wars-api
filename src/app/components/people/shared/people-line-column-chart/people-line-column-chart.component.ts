import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'people-line-column-chart',
  templateUrl: './people-line-column-chart.component.html'
})

export class PeopleLineColumnChartComponent implements OnInit {
  @Input() peopleArray?: [];
  heightArray: any;
  massArray: any;
  nameArray: any;
  usePeopleArray: any;

  highcharts: typeof Highcharts = Highcharts;

  lineColumnChartOptions: Highcharts.Options = {         
    chart : {
       zoomType: 'x'
    },
    title : {
       text: 'Star Wars Characters Height and Weight'   
    },   
    subtitle : {
      text: 'Source: <a href="https://swapi.dev/">swapi.dev</a>'
    },
    yAxis : [
       { // Primary yAxis
          labels: {
             format: '{value} kg',
                style: {
                   color: '#000000'
                }
          },
          title: {
             text: 'Height',
             style: {
                color: '#000000'
             }
          }
       }, 
       { // Secondary yAxis
          title: {
             text: 'Weight',
             style: {
                color: '#000000'
             }
          },
          labels: {
             format: '{value} cm',
             style: {
                color: '#000000'
             }
          },
          opposite: true
       }
    ],
    tooltip: {
       shared: true
    },
    credits: {
      enabled: false
    },
    legend: {
       layout: 'vertical',
       align: 'left',
       x: 65,
       verticalAlign: 'top',
       y: 60,
       floating: true,
             
       backgroundColor: '#FFFFFF'
    }
 };

  constructor() { }

  ngOnInit(): void {
    this.heightArray = [];
    this.massArray = [];
    this.nameArray = [];
    this.usePeopleArray = this.peopleArray;
    for (let i = 0; i < this.usePeopleArray.length; i++) {
      let personHeight = parseInt(this.usePeopleArray[i].height);
      let personMass = parseInt(this.usePeopleArray[i].mass);
      let personName = this.usePeopleArray[i].name;
      this.nameArray.push(personName);
      this.massArray.push(personMass);
      this.heightArray.push(personHeight);
    }
    this.updateOptions(this.nameArray, this.massArray, this.heightArray);
  }

  updateOptions(nameArray: any, massArray: any, heightArray: any) {
    this.lineColumnChartOptions.xAxis = [
      {
        categories: nameArray
      }
    ];

    this.lineColumnChartOptions.series = [
        {
           name: 'Height',
           type: 'column',
           color: '#483D8B',
           yAxis: 1,
           data: heightArray,
           tooltip: {
              valueSuffix: ' cm'
           }
        }, 
        {
           name: 'Weight',
           type: 'spline',
           color: '#006400',
           data: massArray,
           tooltip: {
              valueSuffix: ' kg'
           }
        }
    ];
  }
}
