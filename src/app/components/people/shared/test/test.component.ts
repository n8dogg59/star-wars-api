import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() peopleArray?: [];

  stringJson: any;
  stringObject: any;

  constructor() { }

  ngOnInit(): void {
    this.stringJson = JSON.stringify(this.peopleArray);
    console.log(this.stringJson)
  }
}
