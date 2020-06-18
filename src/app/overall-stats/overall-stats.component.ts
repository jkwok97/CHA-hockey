import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overall-stats',
  templateUrl: './overall-stats.component.html',
  styleUrls: ['./overall-stats.component.css']
})
export class OverallStatsComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Team Leaders', url: 'teams', current: true},
    {name: 'Player Leaders', url: 'players', current: false},
    {name: 'Goalie Leaders', url: 'goalies', current: false},
    // {name: 'Team Overall', url: '', current: true},
    // {name: 'Players Overall', url: '', current: true},
    // {name: 'Goalies Overall', url: '', current: true},
  ];

  constructor() { }

  ngOnInit() {
  }

}
