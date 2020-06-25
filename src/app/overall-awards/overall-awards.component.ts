import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overall-awards',
  templateUrl: './overall-awards.component.html',
  styleUrls: ['./overall-awards.component.css']
})
export class OverallAwardsComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Champions', url: 'champions', current: false},
    {name: 'Leading Scorer', url: 'scorer', current: false},
    {name: 'Best Defenseman', url: 'defense', current: false},
    {name: 'Best Rookie', url: 'rookie', current: false},
    {name: 'Best Goalie', url: 'goalie', current: false},
    {name: 'Best GM', url: 'gm', current: false},
    {name: 'Season Winner', url: 'season', current: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
