import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Team', url: 'team', current: true},
    // {name: 'Player', url: 'players', current: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
