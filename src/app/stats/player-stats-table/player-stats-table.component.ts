import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator } from '@angular/material';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-player-stats-table',
  templateUrl: './player-stats-table.component.html',
  styleUrls: ['./player-stats-table.component.css']
})
export class PlayerStatsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() players: any;
  @Input() statsColumnsToDisplay: [];
  @Input() inPlayerInfo: boolean = false;
  @Input() showAll: boolean;

  page: number = 1;
  pageSize: number;
  length: number = 0;

  @ViewChild("playerSort", {static: false}) playerSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    this.showAll ? this.pageSize = 30 : 25;
    this.length = this.players.length;
  }

  ngAfterViewInit() {
    this.players.sort = this.playerSort;
    this.players.paginator = this.paginator;
  }

  ngOnChanges() {
    this.players.sort = this.playerSort;
  }

  calcPtsPerSixty(points: number, minutes_played: number) {
    return ((points/minutes_played) * 60)
  }

  openPlayer(player: PlayerStat) {
    const type = player['isgoalie'] ? 'goalie' : 'player';
    this._router.navigate([`player-info/${player.player_id}/${type}/stats`]);
  }

  calcShPct(goals, shots) {
    return ((goals / shots) * 100)
  }

  calcMin(gamesPlayed, minutes) {
    return (minutes / gamesPlayed)
  }

}
