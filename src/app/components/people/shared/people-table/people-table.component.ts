import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'people-table',
  templateUrl: './people-table.component.html'
})
export class PeopleTableComponent implements OnInit {

  @Input() peopleArray?: [];
  usePeopleArray: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.peopleArray);
    this.usePeopleArray = [];
    this.usePeopleArray = this.peopleArray;
  }

}
