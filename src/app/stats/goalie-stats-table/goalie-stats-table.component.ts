import { Component, OnInit, ViewChild, Input, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator } from '@angular/material';
import { GoalieStat } from 'src/app/_models/player';

@Component({
  selector: 'app-goalie-stats-table',
  templateUrl: './goalie-stats-table.component.html',
  styleUrls: ['./goalie-stats-table.component.css']
})
export class GoalieStatsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() goalies:any;
  @Input() statsColumnsToDisplay: [];
  @Input() inPlayerInfo: boolean = false;
  @Input() showAll: boolean;

  page: number = 1;
  pageSize: number;
  length: number = 0;

  @ViewChild("goalieSort", {static: false}) goalieSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    this.showAll ? this.pageSize = 30 : 25;
    this.length = this.goalies.length;
  }

  ngAfterViewInit() {
    this.goalies.sort = this.goalieSort;
    this.goalies.paginator = this.paginator;
  }

  ngOnChanges() {
    this.goalies.sort = this.goalieSort;
  }

  openPlayer(player: GoalieStat) {
    const type = player['isgoalie'] ? 'goalie' : 'player';
    this._router.navigate([`player-info/${player.player_id}/${type}/stats`]);
  }

  calcGAA(goalsAgainst, minutes) {
    return (goalsAgainst*60) / minutes;
  }

  calcSvPct(saves, shots) {
    return (saves / shots);
  }

}
