import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'people-donut-chart',
  templateUrl: './people-donut-chart.component.html'
})

export class PeopleDonutChartComponent implements OnInit {
  highcharts: typeof Highcharts = Highcharts;
  @Input() peopleArray?: [];
  eyeColorArray: any;
  sortedPeopleArrayEC: any;
  usePeopleArray: any;

  donutChartOptions: Highcharts.Options = {
    chart : {
      plotShadow: false
    },
    title : {
        text: 'Eye Color Breakdown'   
    },
    tooltip : {
        pointFormat: '{point.percentage:.1f}%</b>'
    },
    plotOptions : {
        pie: {
          shadow: true,
          center: ['50%', '50%'],
          size:'45%',
          innerSize: '40%',
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f} %'
          }
        }
    },
    series : [{
        type: 'pie',
        name: 'Browser share',
        data: [
          ['Firefox',   45.0],
          ['IE',       26.8],
          {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
          },
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Others',      0.7]
        ]
    }]
    }

  constructor() { }

  ngOnInit(): void {
    this.usePeopleArray = this.peopleArray;
    this.eyeColorArray = [];
    this.sortedPeopleArrayEC = this.usePeopleArray;
    this.sortedPeopleArrayEC = this.sortedPeopleArrayEC.sort(this.compareEC);
    this.eyeColorArray = this.calculateEC(this.sortedPeopleArrayEC);
    this.updateOptions(this.eyeColorArray);
  }

  updateOptions(eyeColorArray: any) {
    this.donutChartOptions.series = [{
      type: 'pie',
      name: '% With Eye Color',
      keys: ['name', 'y', 'color'],
      data: eyeColorArray
    }]
  }

  compareEC(a: any, b: any) {
    let comparison = 0;
    if (a.eye_color > b.eye_color) {
      comparison = -1
    } else if (a.eye_color < b.eye_color) {
      comparison = 1;
    }
    return comparison;
  }

  calculateEC(peopleArr: any) {
    let eyeArray = [];  
    let total = 0;
    let inst = 0;

    
    for (let i = 0; i < peopleArr.length; i++) {
      let name = peopleArr[i].name;
      let eyeColor = peopleArr[i].eye_color;
      eyeArray.push({name, eyeColor, total})
    }
    console.log(eyeArray);
    var finalEC = [], prev;
    
    for ( var i = 0; i < eyeArray.length; i++ ) {
      if ( eyeArray[i].eyeColor !== prev ) {
          if (eyeArray[i].eyeColor === 'blue-gray') {
            eyeArray[i].eyeColor = 'steelblue'
          }
          finalEC.push([eyeArray[i].eyeColor, eyeArray[i].total, eyeArray[i].eyeColor]);
          // console.log(finalEC[inst][1]);
          let total = finalEC[inst][1]
          total += 1;
          // console.log(total)
          finalEC[inst][1] = total;
          // console.log(finalEC[inst][1]);
          inst += 1;
      } else {
          // console.log(finalEC[i-1]);
          total = finalEC[inst-1][1];
          total+= 1;
          finalEC[inst-1][1] = total;
          // console.log(finalEC[inst-1])
      }
      prev = eyeArray[i].eyeColor;
      // console.log(prev);
    }
    console.log(finalEC);
    return finalEC;
  }
}
