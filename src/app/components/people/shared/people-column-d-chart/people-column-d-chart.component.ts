import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'people-column-d-chart',
  templateUrl: './people-column-d-chart.component.html'
})

export class PeopleColumnDChartComponent implements OnInit {
  @Input() peopleArray?: [];
  highcharts: typeof Highcharts = Highcharts;
  nameArray: any;
  massArray: any;
  usePeopleArray: any;

  columnDChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      margin: 75,
      options3d: {
         enabled: true,
         alpha: 15,
         beta: 15,
         depth: 50,
         viewDistance: 25
      }
    },         
    title : {
        text: "Character's Mass"   
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
        format: '{value} kg',
        style: {
          color: '#000000'
        }
      },
      title: {
        text: 'Mass',
        style: {
          color: '#000000'
        }
      }
    }, 
    plotOptions : {
      column: {
        depth: 25
      }
    },
    series : [{
        type: 'column',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                194.1, 95.6, 54.4]
    }]
  }

  constructor() { }

  ngOnInit(): void {
    this.nameArray = [];
    this.massArray = [];
    this.usePeopleArray = this.peopleArray;

    for (let i = 0; i < this.usePeopleArray.length; i++) {
      let personMass = parseInt(this.usePeopleArray[i].mass);
      let personName = this.usePeopleArray[i].name;
      this.nameArray.push(personName);
      this.massArray.push(personMass);
    }    
    this.updateOptions(this.nameArray, this.massArray);
 
  }
  updateOptions(nameArray: any, massArray: any) {

    this.columnDChartOptions.series = [
      {
        name: 'Mass',
        type: 'column',
        data: massArray,
        color: '#FF8C00',
        showInLegend: false,
        tooltip: {
          valueSuffix: ' kg'
       }
      }
    ]

    this.columnDChartOptions.xAxis = {
      categories: nameArray
    }
  }
}
