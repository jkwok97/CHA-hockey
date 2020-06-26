import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-information',
  templateUrl: './player-information.component.html',
  styleUrls: ['./player-information.component.css']
})
export class PlayerInformationComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Statistics', url: 'stats', current: true},
    {name: 'NHL Stats', url: 'nhl-stats', current: false},
    {name: 'Ratings', url: 'ratings', current: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
