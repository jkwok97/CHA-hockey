import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overall-ratings-table',
  templateUrl: './overall-ratings-table.component.html',
  styleUrls: ['./overall-ratings-table.component.css']
})
export class OverallRatingsTableComponent implements OnInit, AfterViewInit {

  @Input() stats;
  @Input() columns;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatSort, {static: false}) playerSort: MatSort;  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    if (this.stats) {
      this.length = this.stats.length;
    }
  }

  ngAfterViewInit() {
    if (this.stats) {
      this.stats.sort = this.playerSort;
      this.stats.paginator = this.paginator;
    }
  }

  openPlayer(player) {
    const type = player['isgoalie'] ? 'goalie' : 'player';
    this._router.navigate([`player-info/${player.player_id}/${type}/stats`]);
  }

}
