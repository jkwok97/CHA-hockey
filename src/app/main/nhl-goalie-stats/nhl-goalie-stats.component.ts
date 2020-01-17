import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { takeWhile } from 'rxjs/operators';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nhl-goalie-stats',
  templateUrl: './nhl-goalie-stats.component.html',
  styleUrls: ['./nhl-goalie-stats.component.css']
})
export class NhlGoalieStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;
  start: number = 0;

  sortType: string = "wins"
  sortOrder: string = "DESC"

  playersList = [];

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'team_logo', 'playerName', 'gamesPlayed', 'goalsAgainstAverage', 'wins','losses',
    'shutouts', 'goalsAgainst', 'saves', 'shotsAgainst', 'savePct', 'goals', 'assists', 'points', 'penaltyMinutes'
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _mainService: MainService,
    private _teamsService: TeamsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getSummary(this.start, this.pageSize, "start", this.sortType, this.sortOrder);
  }

  splitName(name) {
    return name.split(" ");
  }

  getSummary(start, pageSize, type, statType, sortOrder) {
    this._mainService.getNHLsummary("20192020", "goalie", statType, sortOrder, start, pageSize).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      let stats = resp['data'] as [];
      stats.forEach( element => { this.playersList.push(element); });
      this.playersList.forEach(player => {
        player.firstName = this.splitName(player['goalieFullName'])[0];
        player = this.findChaTeam(player.playerId, player, "goalie");
      });
      this.goalies = new MatTableDataSource<any[]>(stats);
      this.isLoading = false;
      if (type == "start") {
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
          this.length = resp['total'];
          this.goalies.sort = this.sort;
        }, 350);
      }
    });
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

  openPlayer(player, type) {
    this._router.navigate([`/info/${type}s/${player.player_id}/${player.player_name}`]);
    window.scrollTo(0,0);
  }

  findChaTeam(id, player, type) {
    this._mainService.getChaTeam(id, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      player.chaTeam = resp['team_name'];
      player.cha_player_id = resp['player_id'];
      return player;
    }, error => {
      player.chaTeam = null;
      return player;
    });
  }

  applyFilter(filterValue: string) {
    this.goalies.filter = filterValue.trim().toLowerCase();
    if (this.goalies.paginator) {
      this.goalies.paginator.firstPage();
    }
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
