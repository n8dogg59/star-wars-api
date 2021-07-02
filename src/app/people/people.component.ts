import { Component, OnDestroy, OnInit } from "@angular/core";
import { People } from "../people";
import { apiCallService } from "../apicall.service";
import { Subscription } from "rxjs";
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

@Component({
    selector: 'sw-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss']
  })

export class PeopleComponent implements OnInit, OnDestroy {
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
    sortedPeopleArrayEC: any;
    eyeColorArray: any;
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
            this.eyeColorArray = [];
            this.allPeople = data;
            this.stringJson = JSON.stringify(this.allPeople);  
            this.stringObject = JSON.parse(this.stringJson);
            this.peopleArray = this.stringObject.results;
            this.sortedPeopleArrayEC = this.peopleArray;
            this.sortedPeopleArrayEC = this.sortedPeopleArrayEC.sort(this.compareEC);
            this.eyeColorArray = this.calculateEC(this.sortedPeopleArrayEC);
            console.log(this.eyeColorArray);
            console.log('All done getting people. ', this.peopleArray)
            for (let i = 0; i < this.peopleArray.length; i++) {
              let peopleHeight = parseInt(this.peopleArray[i].height);
              totalHeight += peopleHeight;              
            }
            for (let i = 0; i < this.peopleArray.length; i++) {
              if (this.peopleArray[i].gender === "male") {
                totalMale += 1;
              } else if (this.peopleArray[i].gender === "female") {
                totalFemale += 1;
              } else {
                totalRobot += 1;
              }
              let personHeight = parseInt(this.peopleArray[i].height);
              let personMass = parseInt(this.peopleArray[i].mass);
              let personName = this.peopleArray[i].name;
              this.dataArray.push({name: personName, y: personHeight});
              this.nameArray.push(personName);
              this.massArray.push(personMass);
              this.heightArray.push(personHeight);
            }        
            this.genderArray = [["Male", totalMale], ["Female", totalFemale], ["Droid", totalRobot]]
            this.updateOptions(this.dataArray, this.nameArray, this.massArray, this.heightArray, this.eyeColorArray);
            HC_exporting(Highcharts);

        },
          (err: any) => console.log(err)
      )
    }

    updateOptions(dataArray: any, nameArray: any, massArray: any, heightArray: any, eyeColorArray: any) {
      this.pieChartOptions.series = [
        {
          name: 'Heights',
          colorByPoint: true,
          type: 'pie',
          data: dataArray
        }
      ];

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
          data: this.genderArray
        }
      ];

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

      this.donutChartOptions.series = [{
        type: 'pie',
        name: '% With Eye Color',
        keys: ['name', 'y', 'color'],
        data: eyeColorArray
      }]

      this.dataAvailable = true;
      this.chartOptions = [
        { chartConfig: this.pieChartOptions },
        { chartConfig: this.lineColumnChartOptions },
        { chartConfig: this.pieDChartOptions},
        { chartConfig: this.columnDChartOptions},
        { chartConfig: this.donutChartOptions }
      ]
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
            console.log(finalEC[inst][1]);
            let total = finalEC[inst][1]
            total += 1;
            console.log(total)
            finalEC[inst][1] = total;
            console.log(finalEC[inst][1]);
            inst += 1;
        } else {
            console.log(finalEC[i-1]);
            total = finalEC[inst-1][1];
            total+= 1;
            finalEC[inst-1][1] = total;
            console.log(finalEC[inst-1])
        }
        prev = eyeArray[i].eyeColor;
        console.log(prev);
      }
      console.log(finalEC);
      return finalEC;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

