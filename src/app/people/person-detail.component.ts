import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent implements OnInit {
  pageTitle: string = 'Person Detail';

  constructor() { }

  ngOnInit(): void {
  }

}
