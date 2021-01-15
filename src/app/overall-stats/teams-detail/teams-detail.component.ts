import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'League', url: 'league', current: true},
    {name: 'Conference', url: 'conference', current: false},
    {name: 'Division', url: 'division', current: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
