import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planets } from '../../models/planets';
import { apiCallService } from '../../apicall.service';

@Component({
  templateUrl: './planet-detail.component.html'
})
export class PlanetDetailComponent implements OnInit {

  pageTitle: string = 'Planet Detail';
  planetDetail: Planets | undefined;

  constructor(private route: ActivatedRoute,
              private apiCallService: apiCallService) { }

  ngOnInit(): void {
    let id: string = parseInt(this.route.snapshot.params['id']).toString();
    console.log(id);
    this.apiCallService.getPlanet(id)
      .subscribe(
        (data: Planets) => {
          this.planetDetail = data
          console.log(this.planetDetail);
        },
        (err: any) => console.log(err)
      );
  }

}
