import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-detail',
  templateUrl: './players-detail.component.html',
  styleUrls: ['./players-detail.component.css']
})
export class PlayersDetailComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'All', url: 'all', current: true},
    {name: 'Forwards', url: 'forwards', current: true},
    {name: 'Defense', url: 'defense', current: false},
  ];

  constructor() { }

  ngOnInit() {
  }

}
