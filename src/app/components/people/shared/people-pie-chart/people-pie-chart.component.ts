import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'people-pie-chart',
  templateUrl: './people-pie-chart.component.html'
})

export class PeoplePieChartComponent implements OnInit {
  highcharts: typeof Highcharts = Highcharts;

  pieChartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
      margin: [0, 0, 0, 0]
    },
    title: {
      text: "Person's Height as % of Total Height"
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
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

  @Input() peopleArray?: [];
  usePeopleArray: any;
  heightArray: any;
  dataArray: any;

  constructor() { }

  ngOnInit(): void {
    this.heightArray = [];
    this.usePeopleArray = [];
    this.dataArray = [];
    let totalHeight = 0;
    this.usePeopleArray = this.peopleArray;
    for (let i = 0; i < this.usePeopleArray.length; i++) {
      let peopleHeight = parseInt(this.usePeopleArray[i].height);
      totalHeight += peopleHeight;              
    }
    for (let i = 0; i < this.usePeopleArray.length; i++) {
      let personHeight = parseInt(this.usePeopleArray[i].height);
      let personName = this.usePeopleArray[i].name;
      this.dataArray.push({name: personName, y: personHeight});
    }  
    this.updateOptions(this.dataArray);
  }
  updateOptions(dataArray: any) {
    this.pieChartOptions.series = [
      {
        name: 'Height',
        colorByPoint: true,
        type: 'pie',
        data: dataArray
      }
    ];
  }
}




