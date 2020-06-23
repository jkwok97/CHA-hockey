import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-detail-archives',
  templateUrl: './players-detail-archives.component.html',
  styleUrls: ['./players-detail-archives.component.css']
})
export class PlayersDetailArchivesComponent implements OnInit {

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
