import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material';
import { NhlService } from 'src/app/_services/nhl.service';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-nhl-players-stats',
  templateUrl: './nhl-players-stats.component.html',
  styleUrls: ['./nhl-players-stats.component.css']
})
export class NhlPlayersStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  page: number = 1;
  pageSize: number = 25;
  start: number = 0;
  length: number = 0;

  sortType: string = "points"
  sortOrder: string = "DESC"

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'team_logo', 'playerName', 'positionCode', 'gamesPlayed','goals', 'assists', 'points', 'plusMinus', 'penaltyMinutes', 'ppPoints', 'shPoints',
    'gameWinningGoals', 'shots', 'shootingPctg', 'faceoffWinPctg'
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _nhlService: NhlService,
    private _playerService: PlayerService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getSummary(this.start, this.pageSize, "start", this.sortType, this.sortOrder);
  }

  getSummary(start, pageSize, type, statType, sortOrder) {
    this._nhlService.getNHLsummary('20212022', 'skater', statType, sortOrder, start, pageSize).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      const stats = resp['data'];
      stats.forEach(stat => {
        stat = this.getPlayerLogo(stat.playerId, stat)
      });
      this.players = new MatTableDataSource<any[]>(stats);
      this.isLoading = false;
      if (type == "start") {
        setTimeout(() => {
          this.players.paginator = this.paginator;
          this.length = resp['total'];
          this.players.sort = this.sort;
        }, 350);
      }
    });
  }

  getPlayerLogo(id: number, leader: any) {
    this._playerService.getPlayerTeamLogo(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(logo => {
      leader.cha_logo = logo;
      return leader;
    });
  }

  splitName(name) {
    return name.split(" ");
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    if (pageData.previousPageIndex < pageData.pageIndex) {
      this.start += 25;
    } else {
      this.start -= 25;
    }
    this.length = pageData.length;
    this.getSummary(this.start, this.pageSize, "next", this.sortType, this.sortOrder);
  }

  onSort(event) {
    // console.log(event);
    this.isLoading = true;
    this.start = 0;
    this.sortOrder = (event.direction).toUpperCase();
    this.sortType = event.active;
    this.getSummary(this.start, this.pageSize, "next", this.sortType, this.sortOrder);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
