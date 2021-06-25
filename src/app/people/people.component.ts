import { Component, OnDestroy, OnInit } from "@angular/core";
import { People } from "../people";
import { apiCallService } from "../apicall.service";
import { Subscription } from "rxjs";
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { createFalse } from "typescript";
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

@Component({
    selector: 'sw-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss']
  })

export class PeopleComponent implements OnInit, OnDestroy{
    dataAvailable = false;
    allPeople: People[] | undefined;
    stringJson: any;
    stringObject: any;
    peopleArray: any;
    dataArray: any;
    nameArray: any;
    heightArray: any;
    massArray: any;
    chartOptions: any;
    genderArray: any;
    sub!: Subscription;
    updateFlag = false;
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
   
    
    constructor(private apiCallService: apiCallService) { }
  
    ngOnInit(): void {
      let totalHeight = 0;
      let totalMale = 0;
      let totalFemale = 0;
      let totalRobot = 0;
      this.sub = this.apiCallService.getAllPeople().subscribe(
        (data: People[]) => {
            this.nameArray = [];
            this.dataArray = [];
            this.heightArray = [];
            this.massArray = [];
            this.allPeople = data;
            this.stringJson = JSON.stringify(this.allPeople);  
            this.stringObject = JSON.parse(this.stringJson);
            this.peopleArray = this.stringObject.results;
            console.log('All done getting people. ', this.peopleArray)
            for (let i = 0; i < this.peopleArray.length; i++) {
              let peopleHeight = parseInt(this.peopleArray[i].height);
              totalHeight += peopleHeight;              
            }
            for (let i = 0; i < this.peopleArray.length; i++) {
              if (this.peopleArray[i].gender === "male") {
                totalMale += 1;
                console.log(totalMale);
              } else if (this.peopleArray[i].gender === "female") {
                totalFemale += 1;
                console.log(totalFemale);
              } else {
                totalRobot += 1;
                console.log(totalRobot);
              }
              let personHeight = parseInt(this.peopleArray[i].height);
              console.log(personHeight);
              let personMass = parseInt(this.peopleArray[i].mass);
              let personName = this.peopleArray[i].name;
              this.dataArray.push({name: personName, y: personHeight});
              console.log(this.dataArray);
              this.nameArray.push(personName);
              this.massArray.push(personMass);
              this.heightArray.push(personHeight);
              console.log(this.heightArray);
            }        
            this.genderArray = [["Male", totalMale], ["Female", totalFemale], ["Droid", totalRobot]]
            this.updateOptions(this.dataArray, this.nameArray, this.massArray, this.heightArray);
            HC_exporting(Highcharts);

        },
          (err: any) => console.log(err)
      )
    }

    updateOptions(dataArray: any, nameArray: any, massArray: any, heightArray:any) {
      this.pieChartOptions.series = [
        {
          name: 'Heights',
          colorByPoint: true,
          type: 'pie',
          data: dataArray
        }
      ]

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

      this.pieDChartOptions.series = [
        {
          type: 'pie',
          name: 'Browser share',
          data: this.genderArray
        }
      ]

      this.dataAvailable = true;
      this.chartOptions = [
        { chartConfig: this.pieChartOptions },
        { chartConfig: this.lineColumnChartOptions },
        { chartConfig: this.pieDChartOptions}
      ]
    }    

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

