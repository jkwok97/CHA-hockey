import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    { name: 'By Day', url: 'day', current: true, disabled: false },
    { name: 'All', url: 'all', current: true, disabled: false },
    { name: 'Playoffs', url: 'playoffs', current: true, disabled: true },
  ];

  constructor() { }

  ngOnInit() {
  }

}
