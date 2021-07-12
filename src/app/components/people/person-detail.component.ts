import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { People } from '../../models/people';
import { apiCallService } from "../../apicall.service";


@Component({
  templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent implements OnInit {
  pageTitle: string = 'Person Detail';
  personDetail: People | undefined;

  constructor(private route: ActivatedRoute,
              private apiCallService: apiCallService) { }

  ngOnInit(): void {
    let id: string = parseInt(this.route.snapshot.params['id']).toString();
    console.log(id);
    this.apiCallService.getPerson(id)
      .subscribe(
        (data: People) => {
          this.personDetail = data
          console.log(this.personDetail);
        },
        (err: any) => console.log(err)
      );
  }

}
