import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  activeLinkIndex = -1;

  routes = [
    {name: 'Champions', url: 'champions', current: false},
    {name: 'Drafts', url: 'drafts', current: false},
    {name: 'Archives', url: 'archives', current: false},
  ];

  constructor(
    private _router: Router,
  ) {
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.routes.indexOf(this.routes.find(tab => tab.url === '.' + this._router.url));
    });
   }

  ngOnInit() {
  }

}
