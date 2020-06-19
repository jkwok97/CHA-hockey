import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overall-stats',
  templateUrl: './overall-stats.component.html',
  styleUrls: ['./overall-stats.component.css']
})
export class OverallStatsComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Team Leaders', url: 'teams/leaders', current: true},
    {name: 'Player Leaders', url: 'players/leaders', current: false},
    {name: 'Goalie Leaders', url: 'goalies/leaders', current: false},
    {name: 'Team Overall', url: 'teams/detail/league', current: false},
    {name: 'Players Overall', url: 'players/detail/all', current: false},
    {name: 'Goalies Overall', url: 'goalies/detail', current: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
