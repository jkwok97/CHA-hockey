import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-history',
  templateUrl: './main-history.component.html',
  styleUrls: ['./main-history.component.css']
})
export class MainHistoryComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Team', url: 'team', current: true},
    // {name: 'Player', url: 'players', current: false},
    // {name: 'Goalie', url: 'goalies', current: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
