import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TeamsService } from 'src/app/teams/teams.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { NhlService } from 'src/app/_services/nhl.service';

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

  playersList = [];

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'team_logo', 'playerName', 'positionCode', 'gamesPlayed','goals', 'assists', 'points', 'plusMinus', 'penaltyMinutes', 'ppPoints', 'shPoints',
    'gameWinningGoals', 'shots', 'shootingPctg', 'faceoffWinPctg'
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _nhlService: NhlService,

    private _mainService: MainService,
    private _teamsService: TeamsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getSummary(this.start, this.pageSize, "start", this.sortType, this.sortOrder);
  }

  getSummary(start, pageSize, type, statType, sortOrder) {
    this._nhlService.getNHLsummary('20192020', 'skater', statType, sortOrder, start, pageSize).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      const stats = resp['data'];

      this.playersList = stats.map(stat => ({
        ...stat,
        chaInfo: this.findChaTeam(stat.playerId, stat, 'player')
      }))

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

  splitName(name) {
    return name.split(" ");
  }

  openPlayer(player, type) {
    this._router.navigate([`/info/${type}s/${player.cha_player_id}/${player.lastName}, ${player.firstName}`]);
    window.scrollTo(0,0);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  findChaTeam(id, player, type) {
    this._nhlService.getChaTeam(id, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      player.chaTeam = resp['team_name'];
      player.cha_player_id = resp['player_id'];
      return player;
    }, error => {
      player.chaTeam = null;
      return player;
    });
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
    this.start = 0;
    this.sortOrder = (event.direction).toUpperCase();
    this.sortType = event.active;
    this.getSummary(this.start, this.pageSize, "next", this.sortType, this.sortOrder);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
