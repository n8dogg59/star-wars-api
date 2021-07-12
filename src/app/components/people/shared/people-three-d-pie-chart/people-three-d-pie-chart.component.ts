import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

@Component({
  selector: 'people-three-d-pie-chart',
  templateUrl: './people-three-d-pie-chart.component.html'
})
export class PeopleThreeDPieChartComponent implements OnInit {

  @Input() peopleArray?: [];
  usePeopleArray: any;
  nameArray: any;
  genderArray: any;

  highcharts: typeof Highcharts = Highcharts;

  pieDChartOptions: Highcharts.Options = {
    chart: {
      options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
      }
    },
    title: {
        text: 'Gender Breakdown'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}%</b>: {point.percentage:.1f} %'
          }
      }
    },
    series: [{
      type: 'pie',
      name: 'Browser share',
      data: [
          ['Firefox', 45.0],
          ['IE', 26.8],
          {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
          },
          ['Safari', 8.5],
          ['Opera', 6.2],
          ['Others', 0.7]
      ]
    }]
  };

  constructor() { }

  ngOnInit(): void {
    this.usePeopleArray = this.peopleArray;
    let totalMale = 0;
    let totalFemale = 0;
    let totalRobot = 0;
    this.nameArray = [];

    for (let i = 0; i < this.usePeopleArray.length; i++) {
      if (this.usePeopleArray[i].gender === "male") {
        totalMale += 1;
      } else if (this.usePeopleArray[i].gender === "female") {
        totalFemale += 1;
      } else {
        totalRobot += 1;
      }
    }   
    this.genderArray = [["Male", totalMale], ["Female", totalFemale], ["Droid", totalRobot]]
    this.updateOptions(this.genderArray)
  }
  updateOptions(genderArray: any) {
    this.pieDChartOptions.series = [
      {
        type: 'pie',
        data: genderArray
      }
    ];
  }
}
